import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { injectable, inject } from "inversify";
import { IUserRepository } from "../../repository/user";
import { Types } from "../../constants/types";
import { verify } from "jsonwebtoken";
import { User } from "../../model/user";


@injectable()
export class AuthMiddleware {

  @inject(Types.IUserRepository) private readonly userRepository: IUserRepository;

  public async apply(context: ExpressContext) {
    
    if (!context.req.headers.authorization)
      return undefined;
    
    let token = context.req.headers.authorization.replace("Bearer ", "");
    let payload = await verify(token, process.env.JWT_SECRET) as Partial<User>;
    let user = await this.userRepository.getUserByEmail(payload.email);

    return { user };
    
  }

}