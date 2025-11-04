export class HttpError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BadRequest extends HttpError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

export class NotFound extends HttpError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

export class MethodNotAllowed extends HttpError {
  constructor(message = 'Method Not Allowed') {
    super(405, message);
  }
}

export class NotImplemented extends HttpError {
  constructor(message = 'Not Implemented') {
    super(501, message);
  }
}

export class InternalError extends HttpError {
  constructor(message = 'Internal Server Error') {
    super(500, message);
  }
}

