import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

const schema = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8");

test("starter schema creates the core cognitive training tables", () => {
  for (const table of ["users", "drills", "attempts"]) {
    expect(schema).toMatch(new RegExp(`create table if not exists ${table}\\b`, "i"));
  }
});

test("users store a password hash instead of a plaintext password", () => {
  expect(schema).toMatch(/\bpassword_hash\b/i);
  expect(schema).not.toMatch(/\bpassword\s+text\b/i);
});

test("attempts capture the first analytics metrics", () => {
  for (const column of [
    "score",
    "accuracy",
    "reaction_time_ms",
    "total_questions",
    "correct_answers",
  ]) {
    expect(schema).toMatch(new RegExp(`\\b${column}\\b`, "i"));
  }
});

test("schema seeds the initial drill set", () => {
  for (const drill of [
    "Sequence Memory",
    "Focus Tap",
    "Pattern Match",
    "Quick Math",
    "Logic Check",
  ]) {
    expect(schema).toMatch(new RegExp(drill, "i"));
  }
});
