const drillPreview = [
  { label: "Memory", value: "sequence recall", tone: "bg-lab-yellow" },
  { label: "Focus", value: "reaction gates", tone: "bg-lab-orange" },
  { label: "Logic", value: "deduction sets", tone: "bg-lab-mint" },
];

const authMessages: Record<string, string> = {
  denied: "That email and password did not match.",
  exists: "An account with that email already exists.",
  invalid:
    "Please enter your name, email, and a password with at least 8 characters.",
  login: "You are signed in. Training dashboard comes next.",
  registered: "Account created. Training dashboard comes next.",
};

export const Home = ({ request }: { request: Request }) => {
  const authStatus = new URL(request.url).searchParams.get("auth");
  const authMessage = authStatus ? authMessages[authStatus] : undefined;

  return (
    <main className="min-h-screen bg-lab-surface text-lab-ink">
      <nav className="border-b border-lab-line bg-white/95 px-5 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <a href="/" className="text-lg font-black text-lab-ink no-underline">
            Cognitive Training Lab
          </a>
          <a
            className="rounded-full bg-lab-orange px-4 py-2 text-sm font-black text-white no-underline shadow-auth transition hover:bg-lab-red"
            href="#register"
          >
            Mulai Latihan
          </a>
        </div>
      </nav>

      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl gap-8 px-5 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:py-12">
        <section className="ba-hero-pattern flex min-h-[38rem] flex-col justify-between overflow-hidden rounded-lg border border-lab-line px-6 py-7 sm:px-9 lg:px-11">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-lab-green shadow-auth">
              Brain training lab
            </span>
            <span className="rounded-full bg-lab-red px-3 py-1 text-sm font-black text-white">
              Beta
            </span>
          </div>

          <div className="max-w-2xl py-10">
            <p className="mb-5 inline-flex rounded-full bg-lab-yellow px-4 py-2 text-sm font-black uppercase text-lab-ink">
              Personal cognitive baseline
            </p>
            <h1 className="m-0 max-w-[13ch] text-5xl font-black leading-[0.96] text-lab-ink sm:text-6xl lg:text-7xl">
              Train fast, focus stronger.
            </h1>
            <p className="mt-7 max-w-xl text-lg font-semibold leading-8 text-lab-muted">
              Short memory, focus, logic, and math drills with a colorful
              progress dashboard made for daily practice.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                className="rounded-full bg-lab-orange px-6 py-3 text-base font-black text-white no-underline shadow-auth transition hover:bg-lab-red"
                href="#register"
              >
                Create account
              </a>
              <a
                className="rounded-full border border-lab-green bg-white px-6 py-3 text-base font-black text-lab-green no-underline transition hover:bg-lab-panel"
                href="#login"
              >
                Sign in
              </a>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {drillPreview.map((item) => (
              <div
                className="rounded-lg border border-white bg-white p-4 shadow-auth"
                key={item.label}
              >
                <span className={`block h-2 w-12 rounded-full ${item.tone}`} />
                <p className="m-0 mt-4 text-sm font-black text-lab-ink">
                  {item.label}
                </p>
                <p className="m-0 mt-2 text-sm font-semibold text-lab-muted">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center">
          <div className="w-full max-w-[33rem]">
            <div className="mb-6 rounded-lg bg-lab-deep p-5 text-white shadow-auth">
              <p className="m-0 text-sm font-black uppercase text-lab-yellow">
                Latihan adaptif
              </p>
              <h2 className="m-0 mt-2 text-3xl font-black leading-tight sm:text-4xl">
                Create account
              </h2>
              <p className="m-0 mt-3 text-sm font-semibold text-white/75">
                Start with a fresh baseline, then compare speed and accuracy.
              </p>
            </div>

            {authMessage ? (
              <p className="mb-5 rounded-lg border border-lab-line bg-white p-4 text-sm font-bold text-lab-ink shadow-auth">
                {authMessage}
              </p>
            ) : null}

            <form
              action="/auth/register"
              className="grid gap-4 rounded-lg border border-lab-line bg-white p-5 shadow-auth sm:p-6"
              id="register"
              method="post"
            >
              <label className="grid gap-2 text-sm font-black">
                Name
                <input
                  autoComplete="name"
                  className="h-12 rounded-lg border border-lab-line bg-lab-panel px-3 text-base font-semibold outline-none transition focus:border-lab-green focus:bg-white"
                  name="name"
                  placeholder="Ada Lovelace"
                  required
                  type="text"
                />
              </label>

              <label className="grid gap-2 text-sm font-black">
                Email
                <input
                  autoComplete="email"
                  className="h-12 rounded-lg border border-lab-line bg-lab-panel px-3 text-base font-semibold outline-none transition focus:border-lab-green focus:bg-white"
                  name="email"
                  placeholder="ada@example.com"
                  required
                  type="email"
                />
              </label>

              <label className="grid gap-2 text-sm font-black">
                Password
                <input
                  autoComplete="new-password"
                  className="h-12 rounded-lg border border-lab-line bg-lab-panel px-3 text-base font-semibold outline-none transition focus:border-lab-green focus:bg-white"
                  minLength={8}
                  name="password"
                  placeholder="At least 8 characters"
                  required
                  type="password"
                />
              </label>

              <button
                className="mt-2 h-12 cursor-pointer rounded-full border-0 bg-lab-orange px-4 text-base font-black text-white shadow-auth transition hover:bg-lab-red focus:outline-2 focus:outline-offset-2 focus:outline-lab-orange"
                type="submit"
              >
                Create account
              </button>
            </form>

            <div className="my-7 flex items-center gap-3 text-sm font-black text-lab-muted">
              <span className="h-px flex-1 bg-lab-line" />
              Existing profile
              <span className="h-px flex-1 bg-lab-line" />
            </div>

            <form
              action="/auth/login"
              className="grid gap-4 rounded-lg border border-lab-line bg-white p-5 shadow-auth sm:p-6"
              id="login"
              method="post"
            >
              <h2 className="m-0 text-2xl font-black text-lab-ink">
                Welcome back
              </h2>
              <label className="grid gap-2 text-sm font-black">
                Email
                <input
                  autoComplete="email"
                  className="h-12 rounded-lg border border-lab-line bg-lab-panel px-3 text-base font-semibold outline-none transition focus:border-lab-green focus:bg-white"
                  name="email"
                  required
                  type="email"
                />
              </label>

              <label className="grid gap-2 text-sm font-black">
                Password
                <input
                  autoComplete="current-password"
                  className="h-12 rounded-lg border border-lab-line bg-lab-panel px-3 text-base font-semibold outline-none transition focus:border-lab-green focus:bg-white"
                  name="password"
                  required
                  type="password"
                />
              </label>

              <button
                className="h-12 cursor-pointer rounded-full border border-lab-green bg-white px-4 text-base font-black text-lab-green transition hover:bg-lab-panel focus:outline-2 focus:outline-offset-2 focus:outline-lab-green"
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
