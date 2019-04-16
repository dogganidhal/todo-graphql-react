import { ApolloServer, IResolvers, makeExecutableSchema } from "apollo-server-express";
import * as express from "express";
import { inject, injectable } from "inversify";
import { Types } from "../constants/types";
import { GraphQLDateTime } from "graphql-iso-date";
import { importSchema } from "graphql-import";
import { merge } from "lodash";
import { ITodoResolver, IUserResolver } from "./resolvers";

@injectable()
export class GraphQLServer {

  @inject(Types.ITodoResolver) private readonly todoResolver: ITodoResolver;
  @inject(Types.IUserResolver) private readonly userResolver: IUserResolver

  public get resolvers(): IResolvers {
    return {
      Query: merge(
        this.todoResolver.queries,
        this.userResolver.queries
      ),
      Mutation: merge(
        this.todoResolver.mutations,
        this.userResolver.mutations
      )
    }
  }

  public run(app: express.Application, port: string = "3000") {
    let server = new ApolloServer({ 
      schema: makeExecutableSchema({ 
        typeDefs: importSchema(`${__dirname}/schema.graphql`), 
        resolvers: this.resolvers 
      }),
      introspection: true,
    });
    server.applyMiddleware({ app: app });
    app.listen(port, () => {
      console.log(`GraphQL Server is up and running at ${server.graphqlPath}`)
    })
  }

}