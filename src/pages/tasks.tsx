import {
  Card,
  Grid,
  Heading,
  TabItem,
  Tabs,
  useTheme,
} from "@aws-amplify/ui-react";
import TaskList from "src/components/tasks/taskList";
import useValidation from "src/helpers/form";
import { ICreateTask } from "src/interfaces/tasks";
import { addTask } from "src/services/tasks";
import { useStore } from "src/store/store";
import { CreateTask } from "src/ui-components";

const errorStyles = (error: boolean) => {
  const theme = useTheme();

  return {
    borderColor: error ? theme.tokens.colors.red[40].value : "",
  };
};

const initialValues = {
  title: "",
  description: "",
};

const Tasks = () => {
  const theme = useTheme();

  const [id] = useStore((state) => [state.user.user?.id]);
  const [fetchTasks] = useStore((state) => [state.task.fetchTasks]);

  const handleSubmit = async (values: ICreateTask, resetForm: () => void) => {
    const userId = id as string;

    const updatedTask = {
      ...values,
      userId,
      completed: false,
    };

    await addTask(updatedTask);
    await fetchTasks(userId, {
      completed: false,
    });
    resetForm();
  };

  const {
    values,
    errors,
    resetForm,
    handleBlur,
    handleChange,
    handleSubmit: onSubmit,
  } = useValidation({
    initialValues,
    onSubmit: (values: ICreateTask) => {
      handleSubmit(values, resetForm);
    },
  });

  return (
    <div>
      <Grid
        columnGap="0.5rem"
        rowGap="0.5rem"
        templateColumns="1fr 1fr 1fr"
        templateRows="1fr 3fr 1fr"
        style={{
          margin: "0 auto",
        }}
      >
        <Card columnStart="1" columnEnd="auto">
          <form noValidate onSubmit={onSubmit}>
            <CreateTask
              overrides={{
                Button: {
                  type: "submit",
                  style: {
                    border: "none",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
                    color: theme.tokens.colors.white.value,
                  },
                },
                TextField: {
                  name: "title",
                  onBlur: handleBlur,
                  value: values.title,
                  onChange: handleChange,
                  style: {
                    ...errorStyles(errors.title),
                  },
                },
                TextAreaField: {
                  onBlur: handleBlur,
                  name: "description",
                  onChange: handleChange,
                  value: values.description,
                  style: {
                    ...errorStyles(errors.description),
                  },
                },
              }}
            />
          </form>
        </Card>
        <Card columnStart="2" columnEnd="-1">
          <div
            style={{
              display: "flex",
              alignItems: "start",
              marginBottom: "2rem",
              justifyContent: "space-between",
            }}
          >
            <Heading level={5}>Your Tasks</Heading>
            {/* <SelectField label="Filters">
              <option value="today">Today</option>
              <option value="today">All Time</option>
            </SelectField> */}
          </div>
          <Tabs justifyContent="flex-start">
            <TabItem title="In Progress">
              <TaskList type="inprogress" />
            </TabItem>
            <TabItem title="Completed">
              <TaskList type="completed" />
            </TabItem>
          </Tabs>
        </Card>
      </Grid>
    </div>
  );
};

export default Tasks;
