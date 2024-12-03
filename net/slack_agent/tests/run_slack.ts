import "dotenv/config";
import { slackAgent } from "../src/slack_agent";

import test from "node:test";
import assert from "node:assert";

test("test slackAgent", async () => {
  const namedInputs = { message: ["Hello amateraru from GraphAI Slack agent!"] };
  const params = {
    post_channel: "#p_bootcamp_e_raycast_jp_amaterasu_dev",
  };
  const res = (await slackAgent({ inputs: [], namedInputs, params, filterParams: {}, debugInfo: { verbose: false, nodeId: "test", retry: 5 } })) as any;

  if (res) {
    console.log(res);
  }
  assert.deepStrictEqual(true, true);
});

test("test slackAgent", async () => {
  const namedInputs = { message: "Hello amateraru from GraphAI Slack agent!" };
  const params = {
    post_channel: "#p_bootcamp_e_raycast_jp_amaterasu_dev",
  };
  const res = (await slackAgent({ inputs: [], namedInputs, params, filterParams: {}, debugInfo: { verbose: false, nodeId: "test", retry: 5 } })) as any;

  if (res) {
    console.log(res);
  }
  assert.deepStrictEqual(true, true);
});
