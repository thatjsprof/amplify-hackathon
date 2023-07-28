import {
  Card,
  Grid,
  Heading,
  SelectField,
  useTheme,
} from "@aws-amplify/ui-react";
import { useState } from "react";
import TaskItem, { ITask } from "src/components/tasks/taskItem";
import { CreateTask } from "src/ui-components";

const initialTasks: ITask[] = [
  {
    id: 1,
    title: "Take a walk around the park",
  },
];

const Tasks = () => {
  const theme = useTheme();
  const [tasks, setTasks] = useState<ITask[]>(initialTasks);

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
