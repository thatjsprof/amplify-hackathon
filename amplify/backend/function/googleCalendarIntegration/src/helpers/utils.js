const aws = require("aws-sdk");
const axios = require("axios");
const { ERROR_CODES } = require("./codes");

const { AxiosHeaders } = axios;

const ddb = new aws.DynamoDB.DocumentClient({
  region: process.env.REGION,
});

const USER_TABLE = process.env.API_AMPLIFYHACKATHON_USERTABLE_NAME;

const eventTypes = {
  generateTokens: "generateTokens",
  createEvent: "createEvent",
  getFreeTime: "getFreeTime",
  getEvents: "getEvents",
};

const getTable = async ({
  FilterExpression,
  ExpressionAttributeNames,
  ExpressionAttributeValues,
  TableName,
}) => {
  const params = {
    FilterExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    TableName,
  };

  try {
    const response = await ddb.scan(params).promise();
    return response.Items;
  } catch (err) {
    console.log(err);
  }
};

const updateTable = async ({
  ExpressionAttributeNames,
  ExpressionAttributeValues,
  Key,
  TableName,
  UpdateExpression,
}) => {
  const updateParams = {
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    Key,
    TableName,
    UpdateExpression,
    ReturnValues: "ALL_NEW",
  };

  try {
    return await ddb.update(updateParams).promise();
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (userId) => {
  const user = await getTable({
    FilterExpression: "#id = :userId",
    ExpressionAttributeNames: {
      "#id": "id",
    },
    ExpressionAttributeValues: {
      ":userId": userId,
    },
    TableName: USER_TABLE,
  });

  return user?.[0];
};

const refreshToken = async (refresh_token, userId) => {
  const response = await axios.post("https://oauth2.googleapis.com/token", {
    client_secret: process.env.GOOGLE_SECRET,
    client_id: process.env.GOOGLE_CLIENT,
    grant_type: "refresh_token",
    refresh_token,
  });

  const data = response.data;

  if (data) {
    const userInfo = await getUser(userId);
    const googleCalendarInfo = userInfo.googleCalendar;

    await updateTable({
      ExpressionAttributeNames: {
        "#CAL": "googleCalendar",
      },
      ExpressionAttributeValues: {
        ":CALV": {
          ...googleCalendarInfo,
          idToken: data.id_token,
          accessToken: data.access_token,
        },
      },
      Key: {
        id: userId,
      },
      TableName: USER_TABLE,
      ReturnValues: "ALL_NEW",
      UpdateExpression: "SET #CAL = :CALV",
    });
  }

  return data;
};

const handleAxiosRequest = async ({
  auth = true,
  data = {},
  authInfo,
  method,
  params,
  url,
}) => {
  const userId = authInfo?.userId;

  const user = await getUser(userId);
  const tokenInfo = user.googleCalendar;

  console.log(tokenInfo, "tokenInfo");

  if (tokenInfo) {
    const axiosRequest = async (token = tokenInfo?.accessToken) => {
      const myHeaders = new AxiosHeaders();

      myHeaders.set("Content-Type", "application/json");

      if (auth) {
        myHeaders.set("Authorization", `Bearer ${token}`);
      }

      let func;

      let axiosArray = [
        url,
        data,
        {
          params,
          headers: myHeaders,
        },
      ];

      switch (method) {
        case "GET" || "get":
          func = axios.get;
          axiosArray = [
            url,
            {
              params,
              body: data,
              headers: myHeaders,
            },
          ];
          break;
        case "POST" || "post":
          func = axios.post;
          break;
        case "DELETE" || "delete":
          func = axios.delete;
          break;
        case "PUT" || "put":
          func = axios.put;
          break;
        default:
          func = axios.post;
          break;
      }

      return await func(...axiosArray);
    };

    try {
      const response = await axiosRequest();
      return response.data;
    } catch (err) {
      if (err?.response?.data?.error?.code === ERROR_CODES.UNAUTHENTICATED) {
        const newToken = await refreshToken(tokenInfo?.refreshToken, userId);
        const response = await axiosRequest(newToken.access_token);
        return response.data;
      } else {
        console.log(
          err,
          err?.data,
          err?.response,
          err?.response?.data,
          err?.response?.data?.error
        );
      }
    }
  }

  return null;
};

module.exports = {
  getUser,
  getTable,
  eventTypes,
  updateTable,
  handleAxiosRequest,
};
