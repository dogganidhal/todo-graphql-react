import { ITodoResolver } from ".";
import { inject, injectable } from "inversify";
import { ITodoRepository } from "../../repository/todo";
import { Types } from "../../constants/types";
import { TodoStatus } from "../../model/todo";


@injectable()
export class TodoResolver implements ITodoResolver {
  
  @inject(Types.ITodoRepository) private readonly todoRepository: ITodoRepository;

  public get mutations() {
    return {
      createTodo: (_, args: { title: string, content?: string }) =>
        this.todoRepository.saveTodo(args.title, args.content),
      updateTodoStatus: (_, args: { id: string, status: TodoStatus }) =>
        this.todoRepository.updateTodoStatus(args.id, args.status),
    };
  }
  public get queries() {
    return {
      todos: () => this.todoRepository.getAllTodos(),
      todo: (_, args: { id: string }) => this.todoRepository.getTodoById(args.id),
    };
  };

}