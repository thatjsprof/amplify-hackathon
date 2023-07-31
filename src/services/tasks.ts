import { API } from "aws-amplify";
import { CreateTaskInput, TasksByUserQuery, UpdateTaskInput } from "src/API";
import { createTask, deleteTask, updateTask } from "src/graphql/mutations";
import { tasksByUser } from "src/graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";
import { ITask } from "src/interfaces/tasks";
import { ITodoFilter } from "src/interfaces/store";

export const addTask = async (task: CreateTaskInput) => {
  try {
    await API.graphql({
      query: createTask,
      variables: {
        input: task,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const editTask = async (task: UpdateTaskInput) => {
  try {
    await API.graphql({
      query: updateTask,
      variables: {
        input: task,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const removeTask = async (id: string) => {
  try {
    await API.graphql({
      query: deleteTask,
      variables: {
        input: {
          id,
        },
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const fetchTasks = async (id: string, filter?: ITodoFilter) => {
  const completed = filter?.completed;

  let filterToPass = {} as {
    completed?: { eq: boolean };
  };

  if (completed !== undefined) {
    filterToPass = {
      ...filterToPass,
      completed: {
        eq: completed,
      },
    };
  } else {
    delete filterToPass.completed;
  }

  try {
    const response = (await API.graphql({
      query: tasksByUser,
      variables: {
        userId: id,
        filter: filterToPass,
      },
    })) as GraphQLResult<TasksByUserQuery>;

    return response.data?.tasksByUser?.items as ITask[];
  } catch (err) {
    console.log(err);
  }
};
