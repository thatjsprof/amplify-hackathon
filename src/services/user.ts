import { API } from "aws-amplify";
import { GetUserQuery } from "src/API";
import { GraphQLResult } from "@aws-amplify/api";
import { getUserCustom } from "src/graphql/user";

export const getUserInfo = async (id: string) => {
  try {
    const response = (await API.graphql({
      query: getUserCustom,
      variables: { id },
    })) as GraphQLResult<GetUserQuery>;

    return response.data?.getUser;
  } catch (err) {
    console.log(err);
  }
};
