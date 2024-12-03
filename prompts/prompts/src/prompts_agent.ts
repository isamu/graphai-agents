import { AgentFunction, AgentFunctionInfo } from "graphai";

export const promptsAgent: AgentFunction = async ({ params, namedInputs }) => {
  return { params, namedInputs };
};

const promptsAgentInfo: AgentFunctionInfo = {
  name: "promptsAgent",
  agent: promptsAgent,
  mock: promptsAgent,

  samples: [],
  description: "Prompts Agent",
  category: ["prompt"],
  author: "Receptron team",
  repository: "https://github.com/receptron/graphai",
  license: "MIT",
};

export default promptsAgentInfo;
