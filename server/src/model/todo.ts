import { Typegoose, prop } from "typegoose";

export enum TodoStatus {
  READY = "READY",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE"
}

export class Todo extends Typegoose {

  @prop({_id: true})
  public id: string;

  @prop()
  public title: string;

  @prop()
  public content: string;

  @prop()
  public created: Date;

  @prop({ enum: TodoStatus })
  public status: TodoStatus;

}