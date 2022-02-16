class Error400 {
  public readonly message: string;
  public readonly statusCode: number;
  constructor(message: string) {
    this.message = message;
    this.statusCode = 400;
  }
}
export default Error400;
