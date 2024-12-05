import "dotenv/config";
import { notionAgent } from "../src/notion_agent";

import test from "node:test";
import assert from "node:assert";

test("test notionAgent", async () => {
  const namedInputs = {};
  const params = {};
  const res = (await notionAgent({ namedInputs, params, filterParams: {}, debugInfo: { verbose: false, nodeId: "test", retry: 5 } })) as any;

  if (res) {
    console.log(res);
  }
  assert.deepStrictEqual(res, { params: {}, namedInputs: {} });
});
