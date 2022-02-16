class Error404 {
  public readonly message: string;
  public readonly statusCode: number;
  constructor() {
    this.message = "User not found";
    this.statusCode = 404;
  }
}
export default Error404;
