import { expect, test } from "vitest";

import { hashPassword, verifyPassword } from "../src/app/auth/password";

test("hashPassword stores a verifier instead of the original password", async () => {
  const passwordHash = await hashPassword("correct horse battery staple");

  expect(passwordHash).not.toBe("correct horse battery staple");
  expect(passwordHash).toMatch(/^pbkdf2_sha256\$\d+\$/);
});

test("verifyPassword accepts the original password and rejects another password", async () => {
  const passwordHash = await hashPassword("correct horse battery staple");

  expect(await verifyPassword("correct horse battery staple", passwordHash)).toBe(true);
  expect(await verifyPassword("correct horse battery staple!", passwordHash)).toBe(false);
});

test("hashPassword uses a Cloudflare Workers supported PBKDF2 iteration count", async () => {
  const passwordHash = await hashPassword("correct horse battery staple");
  const [, iterations] = passwordHash.split("$");

  expect(Number(iterations) <= 100_000).toBe(true);
});

test("verifyPassword rejects unsupported PBKDF2 iteration counts without throwing", async () => {
  const unsupportedHash =
    "pbkdf2_sha256$210000$c29tZXNhbHQ=$c29tZWhhc2g=";

  expect(await verifyPassword("password", unsupportedHash)).toBe(false);
});
