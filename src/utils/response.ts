import { ServerResponse } from 'http';

export function sendJson<T>(res: ServerResponse, status: number, data: T): void {
  const payload = JSON.stringify(data);
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', Buffer.byteLength(payload));
  res.end(payload);
}

export function sendEmpty(res: ServerResponse, status = 204): void {
  res.statusCode = status;
  res.end();
}

export function sendError(res: ServerResponse, status: number, message: string): void {
  sendJson(res, status, { message });
}

export function notFound(res: ServerResponse, message = 'Not Found'): void {
  sendError(res, 404, message);
}

export function methodNotAllowed(res: ServerResponse, allow: string[]): void {
  res.setHeader('Allow', allow.join(', '));
  sendError(res, 405, 'Method Not Allowed');
}

