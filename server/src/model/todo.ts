import { Typegoose, prop, Ref } from "typegoose";
import { User } from "./user";
import { ObjectId } from "bson";

export enum TodoStatus {
  READY = "READY",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE"
}

export class Todo extends Typegoose {

  @prop({_id: true})
  public _id: ObjectId;

  public get id(): ObjectId {
    return this._id;
  }

  @prop()
  public title: string;

  @prop()
  public content: string;

  @prop()
  public created: Date;

  @prop({ enum: TodoStatus })
  public status: TodoStatus;

  @prop({ ref: User })
  public user: Ref<User>;

}