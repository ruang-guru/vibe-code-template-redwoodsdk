import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

const schema = readFileSync(new URL("../db/schema.sql", import.meta.url), "utf8");

test("starter schema creates only the auth users table", () => {
  expect(schema).toMatch(/create table if not exists users\b/i);

  for (const removedTable of ["drills", "attempts", "user_game_stats"]) {
    expect(schema).not.toMatch(
      new RegExp(`create table if not exists ${removedTable}\\b`, "i"),
    );
  }
});

test("users store a password hash instead of a plaintext password", () => {
  expect(schema).toMatch(/\bpassword_hash\b/i);
  expect(schema).not.toMatch(/\bpassword\s+text\b/i);
});

test("schema does not include product-specific training data", () => {
  for (const removedTerm of [
    "Sequence Memory",
    "Focus Tap",
    "Pattern Match",
    "Quick Math",
    "Logic Check",
    "score",
    "accuracy",
    "reaction_time_ms",
    "plays_count",
    "best_score",
    "attempts_sync_user_game_stats",
  ]) {
    expect(schema).not.toMatch(new RegExp(removedTerm, "i"));
  }
});
