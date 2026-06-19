# RedwoodSDK Auth Starter

A minimal RedwoodSDK template with email/password registration, password
hashing, signed session cookies, and a protected server-rendered route.

## Setup

```shell
pnpm install
pnpm run dev:init
```

Create a `.env` file with:

```shell
DATABASE_URL="postgres://..."
AUTH_SECRET_KEY="replace-with-a-long-random-secret"
```

Apply the auth schema:

```shell
pnpm run db:migrate
```

## Development

```shell
pnpm run dev
```

Open the URL printed by Vite, create an account, and you should be redirected
to `/account`.

## Checks

```shell
pnpm test
pnpm run types
```
