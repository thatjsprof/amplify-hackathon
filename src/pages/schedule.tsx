import { Button, Card, Heading, Text } from "@aws-amplify/ui-react";
import { useGoogleLogin } from "@react-oauth/google";
import CreateEvent from "src/components/schedule/createEvent";
import EventList from "src/components/schedule/eventList";
import { connectGoogleAccount } from "src/services/auth";
import { useStore } from "src/store/store";

const Schedule = () => {
  const [user] = useStore((state) => [state.user.user]);

  const googleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (tokenResponse) => {
      await connectGoogleAccount({
        code: tokenResponse.code,
        userId: `${user?.id}`,
      });
    },
    scope:
      "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
  });

  const login = () => {
    googleLogin();
  };

  return (
    <div
      style={{
        margin: "0 auto",
        gap: "0.5rem",
        display: "grid",
        gridTemplateRows: "1fr 3fr 1fr",
        gridTemplateColumns: "1fr 1fr 1fr",
      }}
    >
      <Card columnStart="1" columnEnd="auto">
        {!user?.googleCalendar?.connected ? (
          <>
            <Heading
              level={6}
              style={{
                marginBottom: ".8rem",
              }}
            >
              Connect your google account
            </Heading>
            <Button onClick={login}>
              <Text
                style={{
                  fontSize: ".75rem",
                }}
              >
                Connect Now
              </Text>
            </Button>
          </>
        ) : (
          <CreateEvent />
        )}
      </Card>
      <Card columnStart="2" columnEnd="-1">
        {user?.googleCalendar?.connected && <EventList />}
      </Card>
    </div>
  );
};

export default Schedule;
