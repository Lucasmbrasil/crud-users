class Error401 {
  public readonly message: string;
  public readonly statusCode: number;
  constructor(message: string) {
    this.message = message;
    this.statusCode = 401;
  }
}
export default Error401;
