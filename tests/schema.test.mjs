import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const schema = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8");

test("starter schema creates the core cognitive training tables", () => {
  for (const table of ["users", "drills", "attempts"]) {
    assert.match(schema, new RegExp(`create table if not exists ${table}\\b`, "i"));
  }
});

test("users store a password hash instead of a plaintext password", () => {
  assert.match(schema, /\bpassword_hash\b/i);
  assert.doesNotMatch(schema, /\bpassword\s+text\b/i);
});

test("attempts capture the first analytics metrics", () => {
  for (const column of [
    "score",
    "accuracy",
    "reaction_time_ms",
    "total_questions",
    "correct_answers",
  ]) {
    assert.match(schema, new RegExp(`\\b${column}\\b`, "i"));
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
    assert.match(schema, new RegExp(drill, "i"));
  }
});
