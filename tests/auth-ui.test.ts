import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

const home = readFileSync(new URL("../src/app/pages/home.tsx", import.meta.url), "utf8");

test("home page includes one-at-a-time login and registration forms", () => {
  for (const text of [
    "Vibe Code Template",
    "A clean RedwoodSDK starter",
    "Create account",
    "Welcome back",
    "New here?",
    "Already have an account?",
    "isRegisterMode",
    'name="name"',
    'name="email"',
    'name="password"',
    'action="/auth/register"',
    'action="/auth/login"',
  ]) {
    expect(home).toMatch(new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("home page is generic auth template UI", () => {
  expect(home).toMatch(/Email\/password auth/);
  expect(home).toMatch(/Signed session cookies/);
  expect(home).toMatch(/Protected account route/);
  expect(home).toMatch(/Postgres-ready schema/);
});
