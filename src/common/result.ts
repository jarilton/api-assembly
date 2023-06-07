export class Result<T> {
  constructor(
    public readonly value: T,
    public readonly error: Error,
    public readonly data?: any,
  ) {}

  isError(): boolean {
    return !!this.error;
  }
}
