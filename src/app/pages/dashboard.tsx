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
  { name: "Sequence Memory", accent: "bg-lab-yellow", metric: "Memory" },
  { name: "Focus Tap", accent: "bg-lab-mint", metric: "Focus" },
  { name: "Pattern Match", accent: "bg-lab-orange", metric: "Pattern" },
  { name: "Quick Math", accent: "bg-lab-red", metric: "Math" },
  { name: "Logic Check", accent: "bg-lab-green", metric: "Logic" },
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
      <header className="border-b border-lab-line bg-white px-5 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <a
            href="/dashboard"
            className="text-lg font-black text-lab-ink no-underline"
          >
            Cognitive Training Lab
          </a>
          <div className="rounded-full bg-lab-panel px-4 py-2 text-right text-sm">
            <p className="m-0 font-black">{user.name}</p>
            <p className="m-0 font-semibold text-lab-muted">{user.email}</p>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[1fr_22rem] lg:py-12">
        <div>
          <div className="ba-hero-pattern rounded-lg border border-lab-line p-6 shadow-auth sm:p-8">
            <p className="m-0 inline-flex rounded-full bg-lab-yellow px-4 py-2 text-sm font-black uppercase text-lab-ink">
              Training dashboard
            </p>
            <h1 className="m-0 mt-5 max-w-2xl text-4xl font-black leading-tight sm:text-5xl">
              Welcome back, {user.name}.
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-lab-muted">
              Choose a drill, build your daily streak, and start shaping the
              speed-versus-accuracy chart.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {drills.map((drill) => (
              <article
                className="rounded-lg border border-lab-line bg-white p-5 shadow-auth"
                key={drill.name}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={`block h-3 w-14 rounded-full ${drill.accent}`} />
                  <span className="rounded-full bg-lab-panel px-3 py-1 text-xs font-black text-lab-green">
                    {drill.metric}
                  </span>
                </div>
                <h2 className="m-0 mt-5 text-xl font-black">{drill.name}</h2>
                <p className="m-0 mt-3 text-sm font-semibold leading-6 text-lab-muted">
                  Ready for your first baseline attempt.
                </p>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-lg border border-lab-line bg-white p-5 shadow-auth">
          <p className="m-0 text-sm font-black uppercase text-lab-muted">
            Baseline
          </p>
          <div className="mt-5 grid gap-4">
            <Metric label="Attempts" value="0" tone="bg-lab-yellow" />
            <Metric label="Accuracy" value="--" tone="bg-lab-mint" />
            <Metric label="Avg reaction" value="--" tone="bg-lab-orange" />
          </div>
        </aside>
      </section>
    </main>
  );
};

const Metric = ({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) => (
  <div className="rounded-lg border border-lab-line bg-lab-panel p-4">
    <span className={`block h-2 w-10 rounded-full ${tone}`} />
    <p className="m-0 mt-4 text-sm font-black text-lab-muted">{label}</p>
    <p className="m-0 mt-2 text-3xl font-black">{value}</p>
  </div>
);
