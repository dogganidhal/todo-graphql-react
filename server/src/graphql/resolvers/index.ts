
export interface IQueryResolver {
  readonly queries: any;
}

export interface IMutatationResolver {
  readonly mutations: any;
}

export type ITodoResolver = IQueryResolver & IMutatationResolver;
export type IUserResolver = IQueryResolver & IMutatationResolver;