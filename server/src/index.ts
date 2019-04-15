import 'reflect-metadata';
import { GraphQLServer } from "./bootstrap/graphql-server";
import { Container } from "inversify";
import { Types } from "./constants/types";
import { TodoRepositoryImpl } from "./repository/todo/todo-repo-impl";
import * as bodyParser from "body-parser";
import { ITodoRepository } from './repository/todo';
import * as express from "express";
import * as mongoose from "mongoose";


async function main() {

  let container = new Container();

  container.bind<ITodoRepository>(Types.ITodoRepository).to(TodoRepositoryImpl);
  container.bind<GraphQLServer>("GraphQLServer").to(GraphQLServer);

  let app = express();
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  await mongoose.connect('mongodb://localhost:27017/todo', {user: "root", pass: "root"});
  let graphQLServer = container.get<GraphQLServer>("GraphQLServer");

  graphQLServer.run(app, 3000);

}

main();