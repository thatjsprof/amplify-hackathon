export interface IUser {
  id: string;
  name?: string;
  email: string;
  googleCalendar?: {
    idToken?: string;
    connected?: boolean;
    accessToken?: string;
    refreshToken?: string;
  };
  tasks?: any[];
  notes?: any[];
  createdAt?: string;
  updatedAt?: string;
}
