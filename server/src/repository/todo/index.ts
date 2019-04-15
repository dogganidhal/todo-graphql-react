import { Todo } from "../../model/todo";


export interface ITodoRepository {
  getTodoById(id: string): Promise<Todo>;
  getAllTodos(): Promise<Todo[]>;
  saveTodo(title: string, content?: string): Promise<Todo>;
}