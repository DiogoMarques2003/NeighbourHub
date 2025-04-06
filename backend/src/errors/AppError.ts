export default class AppError {
  public readonly message: string;

  public readonly statusCode: number;
  public readonly isFromAuth: boolean;

  constructor(message: string, statusCode: number, isFromAuth = false) {
    this.message = message;
    this.statusCode = statusCode;
    this.isFromAuth = isFromAuth;
  }
}
