import { ITodoRepository } from "./../repository/todo/index";
import { ApolloServer, gql, IResolvers } from "apollo-server-express";
import * as express from "express";
import { inject, injectable } from "inversify";
import { Types } from "../constants/types";
import { GraphQLDateTime } from "graphql-iso-date";

@injectable()
export class GraphQLServer {

  constructor(
    @inject(Types.ITodoRepository)
    private readonly todoRepository: ITodoRepository
  ) { }

  private typeDefs = gql`
    scalar GraphQLDateTime

    type Todo {
      id: ID!
      title: String!,
      content: String,
      created: GraphQLDateTime!
    }

    type Query {
      todos: [Todo]!
      todo(id: ID!): Todo
    }

    type Mutation {
      createTodo(title: String!, content: String): Todo!
    }
  `;

  public get resolvers(): IResolvers {
    let repository = this.todoRepository;
    return {
      Query: {
        todos: () => this.todoRepository.getAllTodos(),
        todo: (id: string) => this.todoRepository.getTodoById(id)
      },
      Mutation: {
        async createTodo(_: null, args: { title: string, content?: string }) {
          return repository.saveTodo(args.title, args.content);
        }
      }
    }
  }
  

  public run(app: express.Application, port: number = 3000) {
    let server = new ApolloServer({ typeDefs: this.typeDefs, resolvers: this.resolvers });
    server.applyMiddleware({ app: app });
    app.listen(port, () => {
      console.log(`GraphQL Server is up and running at http://localhost:${port}${server.graphqlPath}`)
    })
  }

}