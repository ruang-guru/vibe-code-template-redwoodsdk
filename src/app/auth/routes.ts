import { route } from "rwsdk/router";
import { env } from "cloudflare:workers";

import { sql } from "@/db";
import { hashPassword, verifyPassword } from "./password";
import { createAuthCookie } from "./session";

type UserRow = {
  id: string;
  password_hash: string;
};

const workerEnv = env as unknown as {
  AUTH_SECRET_KEY: string;
};

export const authRoutes = [
  route("/auth/register", {
    post: async ({ request }) => {
      const formData = await request.formData();
      const name = String(formData.get("name") ?? "").trim();
      const email = String(formData.get("email") ?? "").trim().toLowerCase();
      const password = String(formData.get("password") ?? "");

      if (!name || !email || password.length < 8) {
        return redirectToAuth("invalid");
      }

      try {
        const passwordHash = await hashPassword(password);
        const users = (await sql`
          insert into users (name, email, password_hash)
          values (${name}, ${email}, ${passwordHash})
          returning id, password_hash
        `) as UserRow[];

        const headers = new Headers({
          Location: "/dashboard",
        });
        headers.append(
          "Set-Cookie",
          await createAuthCookie(users[0].id, workerEnv.AUTH_SECRET_KEY),
        );

        return new Response(null, { status: 303, headers });
      } catch (error) {
        if (isUniqueViolation(error)) {
          return redirectToAuth("exists");
        }

        throw error;
      }
    },
  }),
  route("/auth/login", {
    post: async ({ request }) => {
      const formData = await request.formData();
      const email = String(formData.get("email") ?? "").trim().toLowerCase();
      const password = String(formData.get("password") ?? "");

      const users = (await sql`
        select id, password_hash
        from users
        where email = ${email}
        limit 1
      `) as UserRow[];
      const user = users[0];

      if (!user || !(await verifyPassword(password, user.password_hash))) {
        return redirectToAuth("denied");
      }

      const headers = new Headers({
        Location: "/dashboard",
      });
      headers.append(
        "Set-Cookie",
        await createAuthCookie(user.id, workerEnv.AUTH_SECRET_KEY),
      );

      return new Response(null, { status: 303, headers });
    },
  }),
];

function redirectToAuth(reason: string): Response {
  return new Response(null, {
    status: 303,
    headers: {
      Location: `/?auth=${reason}`,
    },
  });
}

function isUniqueViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}
