import { Todo, TodoStatus } from "../../model/todo";


export interface ITodoRepository {
  updateTodoStatus(id: string, status: TodoStatus): Promise<Todo>;
  getTodoById(id: string): Promise<Todo>;
  getAllTodos(): Promise<Todo[]>;
  saveTodo(title: string, content?: string): Promise<Todo>;
}