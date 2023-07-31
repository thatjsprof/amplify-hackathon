import { API } from "aws-amplify";
import { googleCalendarFunction } from "src/graphql/queries";
import { IEventTypes } from "src/interfaces/amplify";
import { GraphQLResult } from "@aws-amplify/api";

export const addEvent = async ({ event, userId }: any) => {
  const response = (await API.graphql({
    query: googleCalendarFunction,
    variables: {
      eventPayload: JSON.stringify({
        event,
        userId,
      }),
      eventType: IEventTypes.createEvent,
    },
  })) as GraphQLResult<any>;

  const result = JSON.parse(response.data.googleCalendarFunction);
  return result?.body;
};

export const getFreeTime = async ({ event, userId }: any) => {
  const response = (await API.graphql({
    query: googleCalendarFunction,
    variables: {
      eventPayload: JSON.stringify({
        event,
        userId,
      }),
      eventType: IEventTypes.getFreeTime,
    },
  })) as GraphQLResult<any>;

  const result = JSON.parse(response.data.googleCalendarFunction);
  const bodyInfo = JSON.parse(result.body);
  return bodyInfo?.data;
};

export const getEvents = async ({ event, userId }: any) => {
  const response = (await API.graphql({
    query: googleCalendarFunction,
    variables: {
      eventPayload: JSON.stringify({
        event,
        userId,
      }),
      eventType: IEventTypes.getEvents,
    },
  })) as GraphQLResult<any>;

  const result = JSON.parse(response.data.googleCalendarFunction);
  const bodyInfo = JSON.parse(result.body);
  return bodyInfo?.data;
};
