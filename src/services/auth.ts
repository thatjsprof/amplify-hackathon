import { API, Auth } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api";
import { IEventTypes } from "src/interfaces/amplify";
import { IConnectGoogle } from "src/interfaces/auth";
import { googleCalendarFunction } from "src/graphql/queries";
import { getUserInfo } from "./user";

export const getCurrentAuthenticatedUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const userData = await getUserInfo(user.attributes.sub);
    return userData;
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  await Auth.signOut();
};

export const connectGoogleAccount = async ({
  code,
  userId,
}: IConnectGoogle) => {
  (await API.graphql({
    query: googleCalendarFunction,
    variables: {
      eventPayload: JSON.stringify({
        code,
        userId,
      }),
      eventType: IEventTypes.generateTokens,
    },
  })) as GraphQLResult<any>;
  await getUserInfo(userId);
};
