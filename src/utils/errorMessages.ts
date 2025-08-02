export class BaseError extends Error {
  public statusCode: number;
  public response: {
    success: "false";
    message: string;
    errors?: Record<string, string>;
  };

  constructor(
    message: string = "Internal Server Error",
    statusCode = 500,
    errors?: Record<string, string>
  ) {
    super(message);
    this.statusCode = statusCode;

    this.response = {
      success: "false",
      message,
      ...(errors ? { errors } : {}),
    };

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class BadRequestError extends BaseError {
  constructor(message = "Bad Request", errors?: Record<string, string>) {
    super(message, 400, errors);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class NotFoundError extends BaseError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

export class ConflictError extends BaseError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

export class GoneError extends BaseError {
  constructor(message = "Gone") {
    super(message, 410);
  }
}

export class InternalServerError extends BaseError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}
