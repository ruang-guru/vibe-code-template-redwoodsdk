import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

const authRoutes = readFileSync(
  new URL("../src/app/auth/routes.ts", import.meta.url),
  "utf8",
);
const worker = readFileSync(new URL("../src/worker.tsx", import.meta.url), "utf8");

test("successful registration and login redirect to the dashboard", () => {
  expect(authRoutes).not.toMatch(/Location:\s*"\/\?auth=(registered|login)"/);
  expect(authRoutes).toMatch(/Location:\s*"\/dashboard"/);
});

test("worker exposes a dashboard route after authentication", () => {
  expect(worker).toMatch(/route\("\/dashboard",\s*Dashboard\)/);
});
