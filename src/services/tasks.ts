import { API } from "aws-amplify";
import { CreateTaskInput, TasksByUserQuery } from "src/API";
import { createTask } from "src/graphql/mutations";
import { tasksByUser } from "src/graphql/queries";
import { GraphQLResult } from "@aws-amplify/api";
import { ITask } from "src/interfaces/tasks";

export const addTask = async (task: CreateTaskInput) => {
  const response = await API.graphql({
    query: createTask,
    variables: {
      input: task,
    },
  });

  console.log(response);
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
