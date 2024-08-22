import { AgentFunction, AgentFunctionInfo } from "graphai";
import { WebClient } from "@slack/web-api";

export const slackAgent: AgentFunction = async ({ params, namedInputs }) => {
  const token = process.env.SLACK_TOKEN ?? namedInputs.slack_token;
  const channel = params.post_channel;

  const web = new WebClient(token);

  const result = await web.chat.postMessage({
    text: "Hello amateraru from GraphAI Slack agent!",
    channel,
  });
  return {};
};

const slackAgentInfo: AgentFunctionInfo = {
  name: "slackAgent",
  agent: slackAgent,
  mock: slackAgent,

  samples: [],
  description: "Slack Agent",
  category: ["messaging"],
  author: "Receptron team",
  repository: "https://github.com/receptron/graphai",
  license: "MIT",
};

export default slackAgentInfo;
