import { API } from "aws-amplify";
import { CreateTaskInput, TasksByUserQuery, UpdateTaskInput } from "src/API";
import { createTask, updateTask } from "src/graphql/mutations";
import { tasksByUser } from "src/graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";
import { ITask } from "src/interfaces/tasks";

export const addTask = async (task: CreateTaskInput) => {
  await API.graphql({
    query: createTask,
    variables: {
      input: task,
    },
  });
};

export const editTask = async (task: UpdateTaskInput) => {
  await API.graphql({
    query: updateTask,
    variables: {
      input: task,
    },
  });
};

export const fetchTasks = async (id: string) => {
  const response = (await API.graphql({
    query: tasksByUser,
    variables: {
      userId: id,
    },
  })) as GraphQLResult<TasksByUserQuery>;

  return response.data?.tasksByUser?.items as ITask[];
};
