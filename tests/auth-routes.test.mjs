import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const authRoutes = readFileSync(
  new URL("../src/app/auth/routes.ts", import.meta.url),
  "utf8",
);
const worker = readFileSync(new URL("../src/worker.tsx", import.meta.url), "utf8");

test("successful registration and login redirect to the dashboard", () => {
  assert.doesNotMatch(authRoutes, /Location:\s*"\/\?auth=(registered|login)"/);
  assert.match(authRoutes, /Location:\s*"\/dashboard"/);
});

test("worker exposes a dashboard route after authentication", () => {
  assert.match(worker, /route\("\/dashboard",\s*Dashboard\)/);
});
