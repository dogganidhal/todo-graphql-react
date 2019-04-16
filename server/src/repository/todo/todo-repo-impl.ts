import "reflect-metadata";
import { ITodoRepository } from ".";
import { Todo, TodoStatus } from "../../model/todo";
import { injectable } from "inversify";
import { v4 } from "uuid";
import { TodoNotFoundException } from "../../exceptions";

@injectable()
export class TodoRepositoryImpl implements ITodoRepository {

  private todoModel = new Todo().getModelForClass(Todo);
  
  public async getTodoById(id: string): Promise<Todo> {

    let todo = await this.todoModel.findOne({ id: id }).exec();
    
    if (!todo)
      throw TodoNotFoundException(id);
    
    return todo;

  }
  
  public async getAllTodos(): Promise<Todo[]> {
    return await this.todoModel.find().exec();
  }

  public async saveTodo(title: string, content?: string): Promise<Todo> {

    let todo = new Todo();
    
    todo.id = v4();
    todo.content = content;
    todo.title = title;
    todo.created = new Date();
    todo.status = TodoStatus.READY;

    return this.todoModel.create(todo);

  }

  public async updateTodoStatus(id: string, status: TodoStatus): Promise<Todo> {

    let todo = await this.todoModel.findOneAndUpdate({ id: id }, { status: status }, { new: true }).exec();

    if (!todo)
      throw TodoNotFoundException(id);

    return todo;
  }

}