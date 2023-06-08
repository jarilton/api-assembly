export class Result<T, E> {
  constructor(
    public readonly value: T,
    public readonly error: E,
    public readonly data?: any,
  ) {}

  isError(): boolean {
    return !!this.error;
  }
}
