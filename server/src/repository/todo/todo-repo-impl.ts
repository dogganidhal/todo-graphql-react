import "reflect-metadata";
import { ITodoRepository } from ".";
import { Todo } from "../../model/todo";
import { injectable } from "inversify";
import { v4 } from "uuid";

@injectable()
export class TodoRepositoryImpl implements ITodoRepository {

  private todoModel = new Todo().getModelForClass(Todo);
  
  public async getTodoById(id: String): Promise<Todo> {
    return await this.todoModel.findById(id).exec();
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

    return this.todoModel.create(todo);
  }

}