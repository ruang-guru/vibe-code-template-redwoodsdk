import { expect, test } from "vitest";

import {
  createAuthCookie,
  readAuthCookie,
  verifyAuthCookie,
} from "../src/app/auth/session";

test("auth cookie hides the raw user id behind a signed value", async () => {
  const cookie = await createAuthCookie("user-123", "test-secret");

  expect(cookie).toMatch(/^auth_session=/);
  expect(cookie).not.toMatch(/user-123/);
});

test("auth cookie verifies valid values and rejects tampering", async () => {
  const cookie = await createAuthCookie("user-123", "test-secret");
  const sessionValue = readAuthCookie(cookie);

  expect(await verifyAuthCookie(sessionValue, "test-secret")).toBe("user-123");
  expect(await verifyAuthCookie(`${sessionValue}tampered`, "test-secret")).toBeNull();
});
