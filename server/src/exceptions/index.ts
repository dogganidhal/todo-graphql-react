import { ApolloError } from "apollo-server-errors";

export function TodoNotFoundException(todoId: string): ApolloError {
  return new ApolloError(`No todo with id '${todoId}' was found`, "TODO_NOT_FOUND");
}

export function UserAleadyExistsException(email: string): ApolloError {
  return new ApolloError(`User with email '${email}' already exists`, "USER_ALREADY_EXISTS");
}