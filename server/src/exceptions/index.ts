import { ApolloError, AuthenticationError } from "apollo-server-errors";

export function TodoNotFoundException(todoId: string): ApolloError {
  return new ApolloError(`No todo with id '${todoId}' was found`, "TODO_NOT_FOUND");
}

export function UserAleadyExistsException(email: string): ApolloError {
  return new ApolloError(`User with email '${email}' already exists`, "USER_ALREADY_EXISTS");
}

export function UserNotFoundException(email: string): ApolloError {
  return new ApolloError(`No user with email '${email}' was found`, "USER_NOT_FOUND");
}

export let WrongPasswordException: ApolloError = new ApolloError(`Password does not match our records`, "WRONG_PASSWORD");

export let UnauthenticatedException: ApolloError = new AuthenticationError('Missing or invalid authorization header');

export let UnauthorizedException: ApolloError = new ApolloError("Access denied to resource", "FORBIDDEN");