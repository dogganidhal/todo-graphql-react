import 'reflect-metadata';
import { GraphQLServer } from "./bootstrap/graphql-server";
import { Container } from "inversify";
import { Types } from "./constants/types";
import { TodoRepositoryImpl } from "./repository/todo/todo-repo-impl";
import * as bodyParser from "body-parser";
import { ITodoRepository } from './repository/todo';
import * as express from "express";
import * as mongoose from "mongoose";
import { config } from "dotenv";


async function main() {

  config();
  let container = new Container();

  container.bind<ITodoRepository>(Types.ITodoRepository).to(TodoRepositoryImpl);
  container.bind<GraphQLServer>("GraphQLServer").to(GraphQLServer);

  let app = express();
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  await mongoose.connect(process.env.MONGODB_URL, {
    user: process.env.MONGODB_USER, 
    pass: process.env.MONGODB_PASS
  });
  let graphQLServer = container.get<GraphQLServer>("GraphQLServer");

  graphQLServer.run(app, process.env.PORT);

}

main();