import { Auth } from "aws-amplify";

export const getCurrentAuthenticatedUser = async () => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    return user.attributes;
  } catch (err) {
    console.log(err);
  }
};

export const logout = async () => {
  await Auth.signOut();
};
