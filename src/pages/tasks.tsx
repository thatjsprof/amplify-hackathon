import {
  Card,
  Grid,
  Heading,
  Loader,
  SelectField,
  useTheme,
} from "@aws-amplify/ui-react";
import { useEffect } from "react";
import TaskItem from "src/components/tasks/taskItem";
import useValidation from "src/helpers/form";
import { ICreateTask } from "src/interfaces/tasks";
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
  const [tasks, loading, fetchTasks, createTask, editTask] = useStore(
    (state) => [
      state.task.tasks,
      state.task.loading,
      state.task.fetchTasks,
      state.task.createTask,
      state.task.updateTask,
    ]
  );

  const handleSubmit = (values: ICreateTask, resetForm: () => void) => {
    const updatedTask = {
      ...values,
      userId: id,
    };

    createTask(updatedTask);
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
          {loading ? (
            <Loader />
          ) : (
            <>
              {tasks.map((task) => {
                return (
                  <TaskItem updateTask={editTask} key={task.id} {...task} />
                );
              })}
            </>
          )}
        </Card>
      </Grid>
    </div>
  );
};

export default Tasks;
