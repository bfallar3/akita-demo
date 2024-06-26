export interface Todo {
  id: number;
  _id: string;
  title: string;
  description: string;
  status: TodoStatus;
}

export enum TodoStatus {
  OPEN = 'open',
  DONE = 'done'
}
