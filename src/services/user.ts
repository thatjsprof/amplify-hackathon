import { API } from "aws-amplify";
import { GetUserQuery } from "src/API";
import { getUser } from "src/graphql/queries";

export const getUserInfo = async (id: string) => {
  const response = (await API.graphql({
    query: getUser,
    variables: { id },
  })) as GetUserQuery;

  return response.getUser;
};
