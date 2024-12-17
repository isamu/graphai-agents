import { AgentFunction, AgentFunctionInfo } from "graphai";

export const notionAgent: AgentFunction = async ({ params, namedInputs }) => {
  return { params, namedInputs };
};

const notionAgentInfo: AgentFunctionInfo = {
  name: "notionAgent",
  agent: notionAgent,
  mock: notionAgent,

  samples: [],
  description: "Notion Agent",
  category: ["net"],
  author: "Receptron team",
  repository: "https://github.com/receptron/graphai-agents/tree/main/net/notion_agent",
  license: "MIT",
};

export default notionAgentInfo;
