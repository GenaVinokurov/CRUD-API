import { IncomingMessage } from 'http';
import { BadRequest } from '../errors/httpErrors';

export async function parseJsonBody<T = unknown>(req: IncomingMessage, limitBytes = 1_000_000): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const chunks: Buffer[] = [];
    let total = 0;

    req.on('data', (chunk: Buffer) => {
      total += chunk.length;
      if (total > limitBytes) {
        reject(new BadRequest('Payload too large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      if (chunks.length === 0) {
        resolve({} as T);
        return;
      }
      const raw = Buffer.concat(chunks).toString('utf-8');
      try {
        const obj = JSON.parse(raw);
        resolve(obj as T);
      } catch {
        reject(new BadRequest('Invalid JSON body'));
      }
    });

    req.on('error', (err) => reject(err));
  });
}

