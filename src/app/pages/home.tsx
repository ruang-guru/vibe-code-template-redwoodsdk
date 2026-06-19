const authMessages: Record<string, string> = {
  denied: "That email and password did not match.",
  exists: "An account with that email already exists.",
  invalid:
    "Please enter your name, email, and a password with at least 8 characters.",
};

export const Home = ({ request }: { request: Request }) => {
  const authStatus = new URL(request.url).searchParams.get("auth");
  const authMessage = authStatus ? authMessages[authStatus] : undefined;

  return (
    <main className="min-h-screen bg-auth-surface px-5 py-8 text-auth-ink">
      <section className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col justify-center">
          <p className="m-0 text-sm font-bold uppercase text-auth-muted">
            Authentication Starter
          </p>
          <h1 className="m-0 mt-3 text-4xl font-bold leading-tight sm:text-5xl">
            A clean sign-in flow for your next app.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-auth-muted">
            Register a user, hash their password, issue a signed session cookie,
            and protect server-rendered routes.
          </p>
        </div>

        <div className="grid gap-6">
          {authMessage ? (
            <p className="m-0 rounded-lg border border-auth-line bg-white p-4 text-sm font-bold shadow-auth">
              {authMessage}
            </p>
          ) : null}

          <form
            action="/auth/register"
            className="grid gap-4 rounded-lg border border-auth-line bg-white p-5 shadow-auth sm:p-6"
            id="register"
            method="post"
          >
            <h2 className="m-0 text-2xl font-bold">Create account</h2>

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
              className="mt-2 h-12 cursor-pointer rounded-lg border-0 bg-auth-accent px-4 text-base font-bold text-white shadow-auth transition hover:bg-auth-accent-strong focus:outline-2 focus:outline-offset-2 focus:outline-auth-accent"
              type="submit"
            >
              Create account
            </button>
          </form>

          <form
            action="/auth/login"
            className="grid gap-4 rounded-lg border border-auth-line bg-white p-5 shadow-auth sm:p-6"
            id="login"
            method="post"
          >
            <h2 className="m-0 text-2xl font-bold">Welcome back</h2>

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
              className="h-12 cursor-pointer rounded-lg border border-auth-accent bg-white px-4 text-base font-bold text-auth-accent transition hover:bg-auth-panel focus:outline-2 focus:outline-offset-2 focus:outline-auth-accent"
              type="submit"
            >
              Sign in
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};
