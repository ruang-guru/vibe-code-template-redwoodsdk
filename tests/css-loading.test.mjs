import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const documentSource = readFileSync(
  new URL("../src/app/document.tsx", import.meta.url),
  "utf8",
);
const clientSource = readFileSync(
  new URL("../src/client.tsx", import.meta.url),
  "utf8",
);

test("document links app css before the client module loads", () => {
  assert.match(documentSource, /import\s+styles\s+from\s+"..\/styles\.css\?url"/);
  assert.match(documentSource, /<link\s+rel="stylesheet"\s+href=\{styles\}/);
});

test("client entry does not own global css loading", () => {
  assert.doesNotMatch(clientSource, /import\s+"\.\/styles\.css"/);
});
