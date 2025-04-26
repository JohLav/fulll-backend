export interface Query {}

export interface QueryHandler<T> {
  handle(query: Query): T;
}
