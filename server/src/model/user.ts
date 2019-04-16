import { Typegoose, prop, arrayProp, Ref } from "typegoose";
import { Todo } from "./todo";
import { ObjectId } from "bson";


export class User extends Typegoose {

  @prop({ _id: true })
  public _id: ObjectId;

  public get id(): ObjectId {
    return this._id;
  }

  @prop()
  public firstName: string;

  @prop()
  public lastName: string;

  @prop()
  public email: string;

  @prop()
  public passwordHash: string;

  @prop()
  public created: Date;

  public todos: Ref<Todo>[];

}