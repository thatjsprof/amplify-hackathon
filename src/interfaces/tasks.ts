export interface ITask {
  title: string;
  id: string | number;
  description?: string;
  completed?: boolean;
}

export interface ICreateTask {
  title: string;
  userId?: string;
  description: string;
  [x: string]: string | undefined;
}

export interface IUpdateTask {
  id: string;
  title: string;
  userId?: string;
  completed?: boolean;
  description: string;
}
