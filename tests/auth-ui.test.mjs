import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

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
    assert.match(home, new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});
