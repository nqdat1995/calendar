import { TodoStatus } from "./TodoStatus";

export interface Todo {
  _id: string,
  name: string,
  startDate: Date,
  duration: number,
  status: TodoStatus
}