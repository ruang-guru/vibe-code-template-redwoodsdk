import { readFileSync } from "node:fs";
import { expect, test } from "vitest";

const documentSource = readFileSync(
  new URL("../src/app/document.tsx", import.meta.url),
  "utf8",
);
const clientSource = readFileSync(
  new URL("../src/client.tsx", import.meta.url),
  "utf8",
);

test("document links app css before the client module loads", () => {
  expect(documentSource).toMatch(/import\s+styles\s+from\s+"..\/styles\.css\?url"/);
  expect(documentSource).toMatch(/<link\s+rel="stylesheet"\s+href=\{styles\}/);
});

test("client entry does not own global css loading", () => {
  expect(clientSource).not.toMatch(/import\s+"\.\/styles\.css"/);
});
