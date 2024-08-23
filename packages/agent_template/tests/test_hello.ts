import "dotenv/config";
import { templateAgent } from "../src/template_agent";

import test from "node:test";
import assert from "node:assert";

test("test templateAgent", async () => {
  const namedInputs = {};
  const params = {};
  const res = (await templateAgent({ inputs: [], namedInputs, params, filterParams: {}, debugInfo: { verbose: false, nodeId: "test", retry: 5 } })) as any;

  if (res) {
    console.log(res);
  }
  assert.deepStrictEqual(res, { params: {}, namedInputs: {} });
});
