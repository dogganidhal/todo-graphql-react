import { IUserResolver } from ".";
import { inject, injectable } from "inversify";
import { Types } from "../../constants/types";
import { IUserRepository } from "../../repository/user";
import { compare } from "bcrypt";
import { UserNotFoundException, WrongPasswordException, UnauthenticatedException } from "../../exceptions";
import { sign } from "jsonwebtoken";


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
      me: (_, args, context) => {
        if (!context.user)
          throw UnauthenticatedException;
        return this.userRepository.getUserByEmail(context.user.email);
      },
      login: async (_, args: { email: string, password: string }) => {
        let user = await this.userRepository.getUserByEmail(args.email);
        if (!user) 
          throw UserNotFoundException(args.email);
        if (! await compare(args.password, user.passwordHash))
          throw WrongPasswordException;
        
        return sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: '30d' }
        )
      }
    };
  };

}