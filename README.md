# CRUD API (TypeScript, Node.js HTTP)

## Requirements

- Node.js 24.x (>= 24.14.0)

## Setup

```bash
npm install
```

Create a `.env` file (not committed). Example contents:

```env
PORT=4000
```

Note: If `.env.example` is missing, create one with the same contents and commit it. Ensure `.env` itself is gitignored.

## Scripts

- `npm run start:dev` — start in development (ts-node-dev)
- `npm run build` — bundle with webpack
- `npm run start:prod` — run bundled file
- `npm test` — run tests (Jest + Supertest)
- `npm run lint` — ESLint
- `npm run format` — Prettier

## Project Structure

- `src/index.ts` — load env, start server
- `src/server.ts` — create http server, global error handling
- `src/router.ts` — route matcher for `/api/users` and `/api/users/:id`
- `src/controllers/usersController.ts` — placeholders for CRUD handlers (currently 501)
- `src/services/usersService.ts` — service method signatures
- `src/repositories/usersRepository.ts` — repository method signatures
- `src/models/User.ts` — types
- `src/utils/*` — body parser, response helpers, validators
- `src/errors/httpErrors.ts` — HTTP error classes

## Implementing CRUD (you do this)

Implement repository → service → controller methods to fulfill:

- GET `/api/users`
- GET `/api/users/:id`
- POST `/api/users`
- PUT `/api/users/:id`
- DELETE `/api/users/:id`

Return codes: 200, 201, 204, 400, 404, 500. Validate UUID and body shape.

## Tests

`tests/users.e2e.test.ts` contains skipped scenarios. Unskip after implementing CRUD.
