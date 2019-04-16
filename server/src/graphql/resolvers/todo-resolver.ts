import { ITodoResolver } from ".";
import { inject, injectable } from "inversify";
import { ITodoRepository } from "../../repository/todo";
import { Types } from "../../constants/types";
import { TodoStatus } from "../../model/todo";
import { UnauthenticatedException } from "../../exceptions";


@injectable()
export class TodoResolver implements ITodoResolver {
  
  @inject(Types.ITodoRepository) private readonly todoRepository: ITodoRepository;

  public get mutations() {
    return {
      createTodo: (_, args: { title: string, content?: string }, context) => {
        if (!context.user)
          throw UnauthenticatedException;
        return this.todoRepository.saveTodo(args.title, context.user, args.content)
      },
      updateTodoStatus: (_, args: { id: string, status: TodoStatus }, context) => {
        if (!context.user)
          throw UnauthenticatedException;
        return this.todoRepository.updateTodoStatus(args.id, args.status, context.user);
      },
    };
  }
  public get queries() {
    return {
      todos: (_, args, context) => {
        if (!context.user)
          throw UnauthenticatedException;

        return this.todoRepository.getAllTodos(context.user);
      },
      todo: (_, args: { id: string }) => this.todoRepository.getTodoById(args.id),
    };
  };

}