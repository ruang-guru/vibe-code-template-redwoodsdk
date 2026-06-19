import assert from "node:assert/strict";
import { test } from "node:test";

import { hashPassword, verifyPassword } from "../src/app/auth/password.ts";

test("hashPassword stores a verifier instead of the original password", async () => {
  const passwordHash = await hashPassword("correct horse battery staple");

  assert.notEqual(passwordHash, "correct horse battery staple");
  assert.match(passwordHash, /^pbkdf2_sha256\$\d+\$/);
});

test("verifyPassword accepts the original password and rejects another password", async () => {
  const passwordHash = await hashPassword("correct horse battery staple");

  assert.equal(await verifyPassword("correct horse battery staple", passwordHash), true);
  assert.equal(await verifyPassword("correct horse battery staple!", passwordHash), false);
});

test("hashPassword uses a Cloudflare Workers supported PBKDF2 iteration count", async () => {
  const passwordHash = await hashPassword("correct horse battery staple");
  const [, iterations] = passwordHash.split("$");

  assert.equal(Number(iterations) <= 100_000, true);
});

test("verifyPassword rejects unsupported PBKDF2 iteration counts without throwing", async () => {
  const unsupportedHash =
    "pbkdf2_sha256$210000$c29tZXNhbHQ=$c29tZWhhc2g=";

  assert.equal(await verifyPassword("password", unsupportedHash), false);
});
