import { Typegoose, prop } from "typegoose";


export class User extends Typegoose {

  @prop({ _id: true })
  public id: string;

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

}