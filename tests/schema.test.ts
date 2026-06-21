import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

const schema = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8");

test("starter schema creates only the auth users table", () => {
  expect(schema).toMatch(/create table if not exists users\b/i);
});

test("users store a password hash", () => {
  expect(schema).toMatch(/\bpassword_hash\b/i);
});
