declare module "cloudflare:workers" {
  export const env: Env;
}

interface Env {
  DATABASE_URL: string;
  AUTH_SECRET_KEY: string;
}
