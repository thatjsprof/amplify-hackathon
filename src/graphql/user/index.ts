export const getUserCustom = /* GraphQL */ `
  query GetUserCustom($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      googleCalendar {
        connected
      }
      createdAt
      updatedAt
    }
  }
`;
