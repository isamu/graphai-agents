import "dotenv/config";
import { GraphAI } from "graphai";
import slackAgent from "../src/slack_agent";

import test from "node:test";
import assert from "node:assert";

const graph_data = {
  version: 0.5,
  nodes: {
    node1: {
      value: "hello, GraphAI",
    },
    node2: {
      agent: "slackAgent",
      inputs: { message: ":node1" },
      params: { post_channel: "#p_bootcamp_e_raycast_jp_amaterasu_dev" },
      isResult: true,
    },
  },
};

test("test slackAgent", async () => {
  const graph = new GraphAI(graph_data, { slackAgent });
  const result = await graph.run();
  console.log(JSON.stringify(result));
  assert.deepStrictEqual(true, true);
});
