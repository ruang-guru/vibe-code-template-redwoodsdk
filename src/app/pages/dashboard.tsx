import { env } from "cloudflare:workers";

import { readAuthCookie, verifyAuthCookie } from "@/app/auth/session";
import { sql } from "@/db";

type DashboardUser = {
  name: string;
  email: string;
};

const workerEnv = env as unknown as {
  AUTH_SECRET_KEY: string;
};

const drills = [
  "Sequence Memory",
  "Focus Tap",
  "Pattern Match",
  "Quick Math",
  "Logic Check",
];

export const Dashboard = async ({ request }: { request: Request }) => {
  const userId = await verifyAuthCookie(
    readAuthCookie(request.headers.get("Cookie")),
    workerEnv.AUTH_SECRET_KEY,
  );

  if (!userId) {
    return new Response(null, {
      status: 303,
      headers: { Location: "/?auth=denied" },
    });
  }

  const users = (await sql`
    select name, email
    from users
    where id = ${userId}
    limit 1
  `) as DashboardUser[];
  const user = users[0];

  if (!user) {
    return new Response(null, {
      status: 303,
      headers: { Location: "/?auth=denied" },
    });
  }

  return (
    <main className="min-h-screen bg-lab-surface text-lab-ink">
      <header className="border-b border-lab-line bg-white px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <a href="/dashboard" className="font-black text-lab-ink no-underline">
            Cognitive Training Lab
          </a>
          <div className="text-right text-sm">
            <p className="m-0 font-bold">{user.name}</p>
            <p className="m-0 text-lab-muted">{user.email}</p>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1fr_22rem]">
        <div>
          <p className="m-0 text-sm font-bold uppercase text-lab-muted">
            Training dashboard
          </p>
          <h1 className="m-0 mt-2 text-4xl font-black leading-tight">
            Welcome back, {user.name}.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-lab-muted">
            Pick a drill to start collecting speed, accuracy, and streak data.
            The analytics view comes next.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {drills.map((drill) => (
              <article className="border border-lab-line bg-white p-5" key={drill}>
                <h2 className="m-0 text-xl font-black">{drill}</h2>
                <p className="m-0 mt-3 text-sm leading-6 text-lab-muted">
                  Ready for your first baseline attempt.
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="border border-lab-line bg-lab-panel p-5">
          <p className="m-0 text-sm font-bold uppercase text-lab-muted">
            Baseline
          </p>
          <div className="mt-5 grid gap-4">
            <Metric label="Attempts" value="0" />
            <Metric label="Accuracy" value="--" />
            <Metric label="Avg reaction" value="--" />
          </div>
        </aside>
      </section>
    </main>
  );
};

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="border border-lab-line bg-white p-4">
    <p className="m-0 text-sm font-bold text-lab-muted">{label}</p>
    <p className="m-0 mt-2 text-3xl font-black">{value}</p>
  </div>
);
