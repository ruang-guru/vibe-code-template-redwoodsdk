import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

const authRoutes = readFileSync(
  new URL("../src/app/auth/routes.ts", import.meta.url),
  "utf8",
);
const worker = readFileSync(new URL("../src/worker.tsx", import.meta.url), "utf8");

test("successful registration and login redirect to the protected account page", () => {
  expect(authRoutes).not.toMatch(/Location:\s*"\/\?auth=(registered|login)"/);
  expect(authRoutes).toMatch(/Location:\s*"\/account"/);
});

test("worker exposes a protected account route after authentication", () => {
  expect(worker).toMatch(/route\("\/account",\s*Account\)/);
  expect(worker).not.toMatch(/Dashboard/);
});
