import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

const home = readFileSync(new URL("../src/app/pages/home.tsx", import.meta.url), "utf8");

test("home page starts with registration and login forms", () => {
  for (const text of [
    "Create account",
    "Welcome back",
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
  expect(home).toMatch(/Authentication Starter/);
  expect(home).not.toMatch(/Cognitive Training Lab/);
  expect(home).not.toMatch(/drill|training|baseline/i);
});
