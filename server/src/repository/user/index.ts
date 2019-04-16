import { User } from "../../model/user";


export interface IUserRepository {
  signUp(firstName: string, lastName: string, email: string, password: string): Promise<User>;
  getUserByEmail(email: string): Promise<User>;
}