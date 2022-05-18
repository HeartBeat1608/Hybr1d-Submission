import { STATUS_CODES } from "./api_response";

export class CustomError extends Error {
  statusCode: number;

  constructor(message?: string, status?: STATUS_CODES) {
    super();
    this.statusCode = status || STATUS_CODES.INTERNAL_SERVER_ERROR;
    if (message) this.message = message;
  }

  getStatusCode(): number {
    return this.statusCode;
  }
}

export class NotFoundError extends CustomError {
  constructor(message?: string) {
    message ||= "Resource not found";
    super(message);
    this.statusCode = STATUS_CODES.NOT_FOUND;
    this.name = "NotFoundError";
  }
}

export class RequiredError extends CustomError {
  constructor(resource: string) {
    super(`field ${resource} is required.`);
    this.statusCode = STATUS_CODES.BAD_REQUEST;
    this.name = "RequiredError";
  }
}
