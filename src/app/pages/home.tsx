const drillPreview = [
  { label: "Memory", value: "sequence recall" },
  { label: "Focus", value: "reaction gates" },
  { label: "Logic", value: "deduction sets" },
];

const authMessages: Record<string, string> = {
  denied: "That email and password did not match.",
  exists: "An account with that email already exists.",
  invalid: "Please enter your name, email, and a password with at least 8 characters.",
  login: "You are signed in. Training dashboard comes next.",
  registered: "Account created. Training dashboard comes next.",
};

export const Home = ({ request }: { request: Request }) => {
  const authStatus = new URL(request.url).searchParams.get("auth");
  const authMessage = authStatus ? authMessages[authStatus] : undefined;

  return (
    <main className="min-h-screen bg-lab-surface text-lab-ink">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="flex min-h-[42rem] flex-col justify-between overflow-hidden bg-lab-ink px-6 py-8 text-white sm:px-10 lg:px-14">
          <nav className="flex items-center justify-between">
            <a href="/" className="text-lg font-bold text-white no-underline">
              Cognitive Training Lab
            </a>
            <span className="rounded-full border border-white/20 px-3 py-1 text-sm text-white/70">
              Beta
            </span>
          </nav>

          <div className="relative z-10 max-w-2xl py-16">
            <p className="mb-5 text-sm font-semibold uppercase text-lab-mint">
              Personal cognitive baseline
            </p>
            <h1 className="m-0 max-w-[12ch] text-5xl font-black leading-[0.95] sm:text-6xl lg:text-7xl">
              Train fast. Think clearly.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/72">
              Register your lab profile, run short drills, and watch speed,
              accuracy, and streaks sharpen into a measurable training signal.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {drillPreview.map((item) => (
              <div
                className="border border-white/12 bg-white/[0.06] p-4"
                key={item.label}
              >
                <p className="m-0 text-sm font-bold text-lab-mint">
                  {item.label}
                </p>
                <p className="m-0 mt-2 text-sm text-white/65">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-[33rem]">
            <div className="mb-8">
              <p className="m-0 text-sm font-semibold uppercase text-lab-muted">
                Start here
              </p>
              <h2 className="m-0 mt-2 text-3xl font-black leading-tight sm:text-4xl">
                Create account
              </h2>
            </div>

            {authMessage ? (
              <p className="mb-5 border border-lab-line bg-lab-panel p-4 text-sm font-bold text-lab-ink">
                {authMessage}
              </p>
            ) : null}

            <form
              action="/auth/register"
              className="grid gap-4 border border-lab-line bg-white p-5 shadow-auth sm:p-6"
              method="post"
            >
              <label className="grid gap-2 text-sm font-bold">
                Name
                <input
                  autoComplete="name"
                  className="h-12 border border-lab-line bg-lab-panel px-3 text-base outline-none transition focus:border-lab-green focus:bg-white"
                  name="name"
                  placeholder="Ada Lovelace"
                  required
                  type="text"
                />
              </label>

              <label className="grid gap-2 text-sm font-bold">
                Email
                <input
                  autoComplete="email"
                  className="h-12 border border-lab-line bg-lab-panel px-3 text-base outline-none transition focus:border-lab-green focus:bg-white"
                  name="email"
                  placeholder="ada@example.com"
                  required
                  type="email"
                />
              </label>

              <label className="grid gap-2 text-sm font-bold">
                Password
                <input
                  autoComplete="new-password"
                  className="h-12 border border-lab-line bg-lab-panel px-3 text-base outline-none transition focus:border-lab-green focus:bg-white"
                  minLength={8}
                  name="password"
                  placeholder="At least 8 characters"
                  required
                  type="password"
                />
              </label>

              <button
                className="mt-2 h-12 cursor-pointer border-0 bg-lab-green px-4 text-base font-black text-white transition hover:bg-lab-ink focus:outline-2 focus:outline-offset-2 focus:outline-lab-green"
                type="submit"
              >
                Create account
              </button>
            </form>

            <div className="my-8 flex items-center gap-3 text-sm font-bold text-lab-muted">
              <span className="h-px flex-1 bg-lab-line" />
              Existing profile
              <span className="h-px flex-1 bg-lab-line" />
            </div>

            <form
              action="/auth/login"
              className="grid gap-4 border border-lab-line bg-lab-panel p-5 sm:p-6"
              method="post"
            >
              <h2 className="m-0 text-2xl font-black">Welcome back</h2>
              <label className="grid gap-2 text-sm font-bold">
                Email
                <input
                  autoComplete="email"
                  className="h-12 border border-lab-line bg-white px-3 text-base outline-none transition focus:border-lab-green"
                  name="email"
                  required
                  type="email"
                />
              </label>

              <label className="grid gap-2 text-sm font-bold">
                Password
                <input
                  autoComplete="current-password"
                  className="h-12 border border-lab-line bg-white px-3 text-base outline-none transition focus:border-lab-green"
                  name="password"
                  required
                  type="password"
                />
              </label>

              <button
                className="h-12 cursor-pointer border border-lab-ink bg-transparent px-4 text-base font-black text-lab-ink transition hover:bg-lab-ink hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-lab-ink"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};
