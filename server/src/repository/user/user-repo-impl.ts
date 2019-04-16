import { IUserRepository } from ".";
import { User } from "../../model/user";
import { hash } from "bcrypt";
import { UserAleadyExistsException } from "../../exceptions";
import { injectable } from "inversify";
import { v4 } from "uuid";

@injectable()
export class UserRepositoryImpl implements IUserRepository {

  private userModel = new User().getModelForClass(User);
  
  public async signUp(firstName: string, lastName: string, email: string, password: string): Promise<User> {

    let usersWithSameEmail = await this.userModel.count({email: email});
    if (usersWithSameEmail > 0) 
      throw UserAleadyExistsException(email);
    
    let user = new User();

    user.id = v4();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.created = new Date();
    user.passwordHash = await hash(password, 10);

    return this.userModel.create(user);

  }

  public async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

}