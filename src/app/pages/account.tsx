import { env } from "cloudflare:workers";

import { readAuthCookie, verifyAuthCookie } from "@/app/auth/session";
import { sql } from "@/db";

type AccountUser = {
  name: string;
  email: string;
};

const workerEnv = env as unknown as {
  AUTH_SECRET_KEY: string;
};

export const Account = async ({ request }: { request: Request }) => {
  const userId = await verifyAuthCookie(
    readAuthCookie(request.headers.get("Cookie")),
    workerEnv.AUTH_SECRET_KEY,
  );

  if (!userId) {
    return redirectToHome();
  }

  const users = (await sql`
    select name, email
    from users
    where id = ${userId}
    limit 1
  `) as AccountUser[];
  const user = users[0];

  if (!user) {
    return redirectToHome();
  }

  return (
    <main className="min-h-screen bg-auth-surface px-5 py-8 text-auth-ink">
      <section className="mx-auto max-w-3xl rounded-lg border border-auth-line bg-white p-6 shadow-auth sm:p-8">
        <p className="m-0 text-sm font-bold uppercase text-auth-muted">
          Protected route
        </p>
        <h1 className="m-0 mt-3 text-3xl font-bold sm:text-4xl">
          You are signed in.
        </h1>
        <div className="mt-6 rounded-lg bg-auth-panel p-4">
          <p className="m-0 font-bold">{user.name}</p>
          <p className="m-0 mt-1 text-auth-muted">{user.email}</p>
        </div>
      </section>
    </main>
  );
};

function redirectToHome(): Response {
  return new Response(null, {
    status: 303,
    headers: { Location: "/?auth=denied" },
  });
}
