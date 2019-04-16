import { IUserResolver } from ".";
import { inject, injectable } from "inversify";
import { Types } from "../../constants/types";
import { IUserRepository } from "../../repository/user";


@injectable()
export class UserResolver implements IUserResolver {

  @inject(Types.IUserRepository) private readonly userRepository: IUserRepository;

  public get mutations() {
    return {
      createUser: (_, args: { firstName: string, lastName: string, email: string, password: string }) =>
        this.userRepository.signUp(args.firstName, args.lastName, args.email, args.password)
    };
  }
  public get queries() {
    return {
      users: () => this.userRepository.getAllUsers()
    };
  };

}