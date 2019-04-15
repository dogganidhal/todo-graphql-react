import { Typegoose, prop } from "typegoose";

export class Todo extends Typegoose {

  @prop({_id: true})
  public id: string;

  @prop()
  public title: string;

  @prop()
  public content: string;

  @prop()
  public created: Date;

}