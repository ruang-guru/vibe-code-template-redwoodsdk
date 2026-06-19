import assert from "node:assert/strict";
import { test } from "node:test";

import {
  createAuthCookie,
  readAuthCookie,
  verifyAuthCookie,
} from "../src/app/auth/session.ts";

test("auth cookie hides the raw user id behind a signed value", async () => {
  const cookie = await createAuthCookie("user-123", "test-secret");

  assert.match(cookie, /^ctl_session=/);
  assert.doesNotMatch(cookie, /user-123/);
});

test("auth cookie verifies valid values and rejects tampering", async () => {
  const cookie = await createAuthCookie("user-123", "test-secret");
  const sessionValue = readAuthCookie(cookie);

  assert.equal(await verifyAuthCookie(sessionValue, "test-secret"), "user-123");
  assert.equal(
    await verifyAuthCookie(`${sessionValue}tampered`, "test-secret"),
    null,
  );
});
