/* Amplify Params - DO NOT EDIT
	API_AMPLIFYHACKATHON_GRAPHQLAPIIDOUTPUT
	API_AMPLIFYHACKATHON_USERTABLE_ARN
	API_AMPLIFYHACKATHON_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const axios = require("axios");

const {
  updateTable,
  getTable,
  getUser,
  eventTypes,
  handleAxiosRequest,
} = require("./helpers/utils");
const { SUCCESS_CODES, ERROR_CODES } = require("./helpers/codes");

const USER_TABLE = process.env.API_AMPLIFYHACKATHON_USERTABLE_NAME;

const getTokens = async (code) => {
  const response = await axios.post("https://oauth2.googleapis.com/token", {
    client_secret: process.env.GOOGLE_SECRET,
    client_id: process.env.GOOGLE_CLIENT,
    grant_type: "authorization_code",
    redirect_uri: "postmessage",
    code,
  });

  return response.data;
};

const handleTokenGeneration = async (payload) => {
  const code = payload.code;
  const userId = payload.userId;

  const tokenResponse = await getTokens(code);

  if (tokenResponse) {
    const { id_token, access_token, refresh_token } = tokenResponse;

    await updateTable({
      ExpressionAttributeNames: {
        "#CAL": "googleCalendar",
      },
      ExpressionAttributeValues: {
        ":CALV": {
          connected: true,
          idToken: id_token,
          accessToken: access_token,
          refreshToken: refresh_token,
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
};

// Calendar Information

const retrieveCalendars = async (userId) => {
  const result = await handleAxiosRequest({
    method: "GET",
    authInfo: {
      userId,
    },
    data: null,
    url: "https://www.googleapis.com/calendar/v3/users/me/calendarList",
  });

  const calendarInfo = result?.items || [];

  return calendarInfo?.[0];
};

// Event Information

const createEvent = async ({ calendarId, userId, ...rest }) => {
  const response = await handleAxiosRequest({
    method: "POST",
    data: rest,
    authInfo: {
      userId,
    },
    url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
  });

  return response;
};

const retrieveFreeTime = async ({ userId, ...rest }) => {
  const response = await handleAxiosRequest({
    method: "POST",
    data: rest,
    authInfo: {
      userId,
    },
    url: `https://www.googleapis.com/calendar/v3/freeBusy`,
  });

  return response;
};

const getEvents = async ({ calendarId, userId, ...rest }) => {
  const response = await handleAxiosRequest({
    method: "GET",
    authInfo: {
      userId,
    },
    params: rest,
    url: `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
  });

  return response;
};

const handleEventCreation = async (payload) => {
  const userId = payload.userId;
  const eventPayload = payload.event;
  const isLinkedToTask = eventPayload?.linkedToTask || false;

  console.log(eventPayload, "eventPayload");

  //   const calendar = await retrieveCalendars(userId);

  const calendarId = "primary";
  const summary = eventPayload?.title;
  const description = eventPayload?.description;
  const location = eventPayload?.location;
  const start = {
    dateTime: eventPayload?.startDate,
    timeZone: eventPayload?.startTimezone,
  };
  const end = {
    dateTime: eventPayload?.endDate,
    timeZone: eventPayload?.endTimezone,
  };
  const attendees = (eventPayload?.emails || []).map((email) => ({ email }));

  const newEvent = {
    calendarId,
    description,
    attendees,
    location,
    summary,
    start,
    end,
  };

  const event = await createEvent({ ...newEvent, userId });

  const userInfo = await getUser(userId);
  const calendarInfo = userInfo.googleCalendar;
  const eventArray = calendarInfo?.events || [];

  eventArray.push({
    id: event.id,
    eventLink: event.htmlLink,
    linkedToTask: isLinkedToTask,
  });

  await updateTable({
    ExpressionAttributeNames: {
      "#CAL": "googleCalendar",
    },
    ExpressionAttributeValues: {
      ":CALV": {
        ...calendarInfo,
        events: eventArray,
      },
    },
    Key: {
      id: userId,
    },
    TableName: USER_TABLE,
    ReturnValues: "ALL_NEW",
    UpdateExpression: "SET #CAL = :CALV",
  });
};

const handleEventsGet = async (payload) => {
  const userId = payload.userId;
  const eventPayload = payload.event;

  //   const eventTypes = eventPayload.eventTypes || "default"; // Figure out the reason why this returns an error
  const singleEvents = eventPayload.singleEvents || true;
  const timeMin = eventPayload.startDate;
  const timeMax = eventPayload.endDate;
  const orderBy = eventPayload.orderBy || "startTime";

  const body = {
    singleEvents,
    eventTypes,
    timeMax,
    timeMin,
    orderBy,
  };

  const events = await getEvents({
    ...body,
    userId,
    calendarId: "primary",
  });

  const eventsInfo = events.items;

  const eventsMap = eventsInfo.map(({ start, end, summary, description }) => ({
    summary,
    description,
    end,
    start,
  }));

  return eventsMap;
};

const handleGetFreeTime = async (payload) => {
  const userId = payload.userId;
  const eventPayload = payload.event;

  const body = {
    timeMin: eventPayload.startDate,
    timeMax: eventPayload.endDate,
    items: [
      {
        id: "primary",
      },
    ],
  };

  const response = await retrieveFreeTime({
    userId,
    ...body,
  });

  return response.calendars.primary.busy;
};

exports.handler = async (event) => {
  const eventType = event.arguments.eventType;
  const payload = event.arguments.eventPayload;

  try {
    switch (eventType) {
      case eventTypes.generateTokens:
        await handleTokenGeneration(payload);

        return {
          statusCode: SUCCESS_CODES.OK,
          body: JSON.stringify({
            status: SUCCESS_CODES.OK,
            message: "Google account connected successfully",
          }),
        };

      case eventTypes.createEvent:
        await handleEventCreation(payload);

        return {
          statusCode: SUCCESS_CODES.OK,
          body: JSON.stringify({
            status: SUCCESS_CODES.OK,
            message: "Event created successfully",
          }),
        };
      case eventTypes.getEvents:
        const resultGet = await handleEventsGet(payload);

        return {
          statusCode: SUCCESS_CODES.OK,
          body: JSON.stringify({
            status: SUCCESS_CODES.OK,
            message: "Events retrieved successfully",
            data: resultGet,
          }),
        };

      case eventTypes.getFreeTime:
        const result = await handleGetFreeTime(payload);

        return {
          statusCode: SUCCESS_CODES.OK,
          body: JSON.stringify({
            status: SUCCESS_CODES.OK,
            message: "Free time retrieved successfully",
            data: result,
          }),
        };
    }
  } catch (err) {
    // handle return for error here
    console.log(
      err,
      err?.data,
      err?.response,
      err?.response?.data,
      err?.response?.data?.error
    );
  }

  return {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
};
