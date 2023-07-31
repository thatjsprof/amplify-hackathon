export interface ITask {
  title: string;
  userId?: string;
  id: string | number;
  description?: string;
  completed?: boolean;
}

export interface ICreateTask {
  title: string;
  userId?: string;
  description: string;
  completed?: boolean;
  [x: string]: string | boolean | undefined;
}

export interface IUpdateTask {
  id: string;
  title: string;
  userId?: string;
  completed?: boolean;
  description: string;
}
