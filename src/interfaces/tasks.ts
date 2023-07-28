export interface ITask {
  title: string;
  id: string | number;
  description?: string;
}

export interface ICreateTask {
  title: string;
  userId?: string;
  description: string;
  [x: string]: string | undefined;
}
