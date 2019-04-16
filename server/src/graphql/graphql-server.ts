import { ITodoRepository } from "../repository/todo/index";
import { ApolloServer, gql, IResolvers, ApolloError, toApolloError } from "apollo-server-express";
import * as express from "express";
import { inject, injectable } from "inversify";
import { Types } from "../constants/types";
import { GraphQLDateTime } from "graphql-iso-date";
import { TodoStatus } from "../model/todo";
import { IUserRepository } from "../repository/user";

@injectable()
export class GraphQLServer {

  constructor(
    @inject(Types.ITodoRepository)
    private readonly todoRepository: ITodoRepository,
    @inject(Types.IUserRepository)
    private readonly userRepository: IUserRepository
  ) { }

  private typeDefs = gql`
    scalar GraphQLDateTime

    enum TodoStatus {
      READY
      IN_PROGRESS
      DONE
    }

    type User {
      id: ID!
      firstName: String!
      lastName: String!
      email: String!
      passwordHash: String!
      created: GraphQLDateTime!
    }

    type Todo {
      id: ID!
      title: String!,
      content: String,
      created: GraphQLDateTime!
      status: TodoStatus!
    }

    type Query {
      todos: [Todo]!
      todo(id: ID!): Todo
      users: [User]!
    }

    type Mutation {
      createUser(firstName: String!, lastName: String!, email: String!, password: String!): User
      createTodo(title: String!, content: String): Todo!
      updateTodoStatus(id: ID!, status: TodoStatus!): Todo
    }
  `;

  public get resolvers(): IResolvers {
    return {
      Query: {
        todos: () => this.todoRepository.getAllTodos(),
        todo: (_, args: { id: string }) => this.todoRepository.getTodoById(args.id),
        users: () => this.userRepository.getAllUsers()
      },
      Mutation: {
        createTodo: (_, args: { title: string, content?: string }) => 
          this.todoRepository.saveTodo(args.title, args.content),
        updateTodoStatus: (_, args: { id: string, status: TodoStatus }) => 
          this.todoRepository.updateTodoStatus(args.id, args.status),
        createUser: (_, args: { firstName: string, lastName: string, email: string, password: string }) => 
          this.userRepository.signUp(args.firstName, args.lastName, args.email, args.password)
      }
    }
  }

  public run(app: express.Application, port: string = "3000") {
    let server = new ApolloServer({ 
      typeDefs: this.typeDefs, 
      resolvers: this.resolvers,
      introspection: true,
    });
    server.applyMiddleware({ app: app });
    app.listen(port, () => {
      console.log(`GraphQL Server is up and running at ${server.graphqlPath}`)
    })
  }

}