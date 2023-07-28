import { API, graphqlOperation } from "aws-amplify";

export interface IAPIOperation {
  query: any;
  authToken?: string;
  variables?: Record<string, PropertyKey>;
}

export const executeAPIOperation = async ({
  query,
  authToken,
  variables,
}: IAPIOperation) => {
  return await API.graphql(graphqlOperation(query, variables, authToken));
};
