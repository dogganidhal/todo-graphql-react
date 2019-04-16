import "reflect-metadata";
import { ITodoRepository } from ".";
import { Todo, TodoStatus } from "../../model/todo";
import { injectable } from "inversify";
import { v4 } from "uuid";
import { TodoNotFoundException, UnauthenticatedException, UnauthorizedException } from "../../exceptions";
import { User } from "../../model/user";
import { ObjectId } from "bson";

@injectable()
export class TodoRepositoryImpl implements ITodoRepository {

  private todoModel = new Todo().getModelForClass(Todo);
  private userModel = new User().getModelForClass(User);
  
  public async getTodoById(id: string): Promise<Todo> {

    let todo = await this.todoModel.findOne({ id: id }).exec();
    
    if (!todo)
      throw TodoNotFoundException(id);
    
    return todo;

  }
  
  public async getAllTodos(user: User): Promise<Todo[]> {
    return await this.todoModel
      .find({ user: user._id })
      .populate('user')
      .exec();
  }

  public async saveTodo(title: string, user: User, content?: string): Promise<Todo> {

    let todo = new Todo();
    
    todo._id = ObjectId.createFromTime(Date.now());
    todo.content = content;
    todo.title = title;
    todo.created = new Date();
    todo.status = TodoStatus.READY;
    todo.user = user;

    await this.todoModel.create(todo);

    return todo;

  }

  public async updateTodoStatus(id: string, status: TodoStatus, user: User): Promise<Todo> {

    let todo = await this.todoModel.findOne({ id: id }).exec();
    if (!todo)
      throw TodoNotFoundException(id);
    if (todo.user !== user)
      throw UnauthorizedException;

    todo.status = status;
    await this.todoModel.update({ id: id }, todo);

    todo.user = await this.userModel.findOne({ id: todo.user._id });

    return todo;
  }

}