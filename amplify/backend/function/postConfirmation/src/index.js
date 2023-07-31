/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
/* Amplify Params - DO NOT EDIT
	API_AMPLIFYHACKATHON_GRAPHQLAPIIDOUTPUT
	API_AMPLIFYHACKATHON_USERTABLE_ARN
	API_AMPLIFYHACKATHON_USERTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

var aws = require("aws-sdk");

const ddb = new aws.DynamoDB.DocumentClient({
  region: process.env.REGION,
});

exports.handler = async (event, context) => {
  let date = new Date();

  if (event.request.userAttributes.sub) {
    let params = {
      Item: {
        __typename: "User",
        id: event.request.userAttributes.sub,
        name: event.request.userAttributes.name,
        email: event.request.userAttributes.email,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
      },
      TableName: process.env.API_AMPLIFYHACKATHON_USERTABLE_NAME,
    };

    try {
      await ddb.put(params).promise();
      console.log("Success");
    } catch (err) {
      console.log("Error", err);
    }

    console.log("Success: User added to dynamoDB");
    context.done(null, event);
  } else {
    console.log("Error: User not added to dynamoDB");
    context.done(null, event);
  }
};
