import http, { IncomingMessage, ServerResponse } from 'http';
import { routeRequest } from './router';
import { sendError } from './utils/response';
import { HttpError, InternalError } from './errors/httpErrors';

export function createServer(): http.Server {
  const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
    try {
      await routeRequest(req, res);
    } catch (error) {
      const err = error as Error;
      if (err instanceof HttpError) {
        sendError(res, err.statusCode, err.message);
      } else {
        const internal = new InternalError('Internal Server Error');
        sendError(res, internal.statusCode, internal.message);
      }
    }
  });

  return server;
}

