import 'dotenv/config';
import { createServer } from './server';

const port = Number(process.env.PORT || 4000);

const server = createServer();

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${port}`);
});

