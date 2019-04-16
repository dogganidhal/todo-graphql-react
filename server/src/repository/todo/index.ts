import { Todo, TodoStatus } from "../../model/todo";
import { User } from "../../model/user";


export interface ITodoRepository {
  updateTodoStatus(id: string, status: TodoStatus, user: User): Promise<Todo>;
  getTodoById(id: string): Promise<Todo>;
  getAllTodos(user: User): Promise<Todo[]>;
  saveTodo(title: string, user: User, content?: string): Promise<Todo>;
}