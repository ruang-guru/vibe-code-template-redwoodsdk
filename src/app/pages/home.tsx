const authMessages: Record<string, string> = {
  denied: "That email and password did not match.",
  exists: "An account with that email already exists.",
  invalid:
    "Please enter your name, email, and a password with at least 8 characters.",
};

export const Home = ({ request }: { request: Request }) => {
  const searchParams = new URL(request.url).searchParams;
  const authStatus = searchParams.get("auth");
  const authMessage = authStatus ? authMessages[authStatus] : undefined;
  const authMode = searchParams.get("mode") === "register" ? "register" : "login";
  const isRegisterMode = authMode === "register";

  return (
    <main className="min-h-screen bg-auth-surface px-5 py-8 text-auth-ink sm:px-8 lg:px-10">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="max-w-2xl">
          <p className="m-0 text-sm font-bold uppercase tracking-[0.22em] text-auth-accent">
            Vibe Code Template
          </p>
          <h1 className="m-0 mt-4 text-4xl font-bold leading-tight text-auth-ink sm:text-6xl">
            A clean RedwoodSDK starter for full-stack apps.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-auth-muted">
            Authentication, database wiring, protected routes, and deployment-ready
            defaults in a small template you can reshape quickly.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Email/password auth",
              "Signed session cookies",
              "Protected account route",
              "Postgres-ready schema",
            ].map((feature) => (
              <div
                className="flex items-center gap-3 rounded-lg border border-auth-line bg-white/70 px-4 py-3 text-sm font-bold shadow-auth-soft"
                key={feature}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-auth-accent" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-md gap-4">
          {authMessage ? (
            <p className="m-0 rounded-lg border border-auth-line bg-white p-4 text-sm font-bold shadow-auth">
              {authMessage}
            </p>
          ) : null}

          <div className="rounded-lg border border-auth-line bg-white p-5 shadow-auth sm:p-6">
            {isRegisterMode ? (
              <form action="/auth/register" className="grid gap-4" id="register" method="post">
                <div>
                  <h2 className="m-0 text-2xl font-bold">Create account</h2>
                  <p className="m-0 mt-2 text-sm leading-6 text-auth-muted">
                    Start with a name, email, and secure password.
                  </p>
                </div>

                <label className="grid gap-2 text-sm font-bold">
                  Name
                  <input
                    autoComplete="name"
                    className="h-12 rounded-lg border border-auth-line bg-auth-panel px-3 text-base outline-none transition focus:border-auth-accent focus:bg-white"
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
                    className="h-12 rounded-lg border border-auth-line bg-auth-panel px-3 text-base outline-none transition focus:border-auth-accent focus:bg-white"
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
                    className="h-12 rounded-lg border border-auth-line bg-auth-panel px-3 text-base outline-none transition focus:border-auth-accent focus:bg-white"
                    minLength={8}
                    name="password"
                    placeholder="At least 8 characters"
                    required
                    type="password"
                  />
                </label>

                <button
                  className="mt-2 h-12 cursor-pointer rounded-lg border-0 bg-auth-accent px-4 text-base font-bold text-white shadow-auth-soft transition hover:bg-auth-accent-strong focus:outline-2 focus:outline-offset-2 focus:outline-auth-accent"
                  type="submit"
                >
                  Create account
                </button>

                <p className="m-0 border-t border-auth-line pt-4 text-center text-sm text-auth-muted">
                  Already have an account?{" "}
                  <a className="font-bold text-auth-accent" href="/">
                    Sign in
                  </a>
                </p>
              </form>
            ) : (
              <form action="/auth/login" className="grid gap-4" id="login" method="post">
                <div>
                  <h2 className="m-0 text-2xl font-bold">Welcome back</h2>
                  <p className="m-0 mt-2 text-sm leading-6 text-auth-muted">
                    Sign in to open the protected account route.
                  </p>
                </div>

                <label className="grid gap-2 text-sm font-bold">
                  Email
                  <input
                    autoComplete="email"
                    className="h-12 rounded-lg border border-auth-line bg-auth-panel px-3 text-base outline-none transition focus:border-auth-accent focus:bg-white"
                    name="email"
                    required
                    type="email"
                  />
                </label>

                <label className="grid gap-2 text-sm font-bold">
                  Password
                  <input
                    autoComplete="current-password"
                    className="h-12 rounded-lg border border-auth-line bg-auth-panel px-3 text-base outline-none transition focus:border-auth-accent focus:bg-white"
                    name="password"
                    required
                    type="password"
                  />
                </label>

                <button
                  className="h-12 cursor-pointer rounded-lg border-0 bg-auth-accent px-4 text-base font-bold text-white shadow-auth-soft transition hover:bg-auth-accent-strong focus:outline-2 focus:outline-offset-2 focus:outline-auth-accent"
                  type="submit"
                >
                  Sign in
                </button>

                <p className="m-0 border-t border-auth-line pt-4 text-center text-sm text-auth-muted">
                  New here?{" "}
                  <a className="font-bold text-auth-accent" href="/?mode=register">
                    Create an account
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
