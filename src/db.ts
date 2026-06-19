import { neon } from "@neondatabase/serverless";
import { env } from "cloudflare:workers";

const workerEnv = env as unknown as {
  DATABASE_URL: string;
};

export const sql = neon(workerEnv.DATABASE_URL);
