import {
  Card,
  Grid,
  Heading,
  SelectField,
  useTheme,
} from "@aws-amplify/ui-react";
import { useEffect } from "react";
import TaskItem from "src/components/tasks/taskItem";
import { useStore } from "src/store/store";
import { CreateTask } from "src/ui-components";

const Tasks = () => {
  const theme = useTheme();
  const [id] = useStore((state) => [state.user.user?.id]);
  const [tasks, fetchTasks] = useStore((state) => [
    state.task.tasks,
    state.task.fetchTasks,
  ]);

  useEffect(() => {
    if (id) {
      fetchTasks(id);
    }
  }, [id]);

  return (
    <div>
      <Grid
        columnGap="0.5rem"
        rowGap="0.5rem"
        templateColumns="1fr 1fr 1fr"
        templateRows="1fr 3fr 1fr"
        style={{
          maxWidth: "100rem",
          margin: "0 auto",
          marginTop: "3rem",
        }}
      >
        <Card columnStart="1" columnEnd="auto">
          <CreateTask
            overrides={{
              Button: {
                style: {
                  border: "none",
                  paddingTop: "1rem",
                  paddingBottom: "1rem",
                  color: theme.tokens.colors.white.value,
                },
              },
            }}
          />
        </Card>
        <Card columnStart="2" columnEnd="-1">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "2rem",
              justifyContent: "space-between",
            }}
          >
            <Heading level={5}>Your Tasks</Heading>
            <SelectField label="Filters">
              <option value="today">Today</option>
              <option value="today">All Time</option>
            </SelectField>
          </div>
          {tasks.map((task) => {
            return <TaskItem key={task.id} {...task} />;
          })}
        </Card>
      </Grid>
    </div>
  );
};

export default Tasks;
