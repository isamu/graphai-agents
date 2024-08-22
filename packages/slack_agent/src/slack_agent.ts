import { AgentFunction, AgentFunctionInfo } from "graphai";

export const slackAgent: AgentFunction = async ({
  params,
  namedInputs,
}) => {
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
