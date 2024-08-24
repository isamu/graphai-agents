import { AgentFunction, AgentFunctionInfo } from "graphai";
import { WebClient } from "@slack/web-api";

export const slackAgent: AgentFunction = async ({ params, namedInputs }) => {
  const token = process.env.SLACK_TOKEN ?? namedInputs.slack_token;
  const channel = params.post_channel;

  if (!token) {
    throw new Error("SLACK_TOKEN is not set in environment variables.");
  }
  if (!channel) {
    throw new Error("Slacl post_channel is not set in params.");
  }

  const message = namedInputs.message ?? params.message;
  const text = Array.isArray(message) ? message.join("\n") : message;
  const web = new WebClient(token);

  await web.chat.postMessage({
    text,
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
