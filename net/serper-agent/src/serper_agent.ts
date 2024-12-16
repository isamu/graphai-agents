import { AgentFunction, AgentFunctionInfo } from "graphai";

export const serperAgent: AgentFunction = async ({ params, namedInputs }) => {
  return { params, namedInputs };
};

const serperAgentInfo: AgentFunctionInfo = {
  name: "serperAgent",
  agent: serperAgent,
  mock: serperAgent,

  samples: [{
    params: {a: "1"},
    inputs: {b: "2"},
    result: {
      params: {a: "1"},
      namedInputs: {b: "2"},
    },
  }],
  description: "serper agent",
  category: ["net"],
  author: "isamu arimoto",
  repository: "https://github.com/isamu/graphai-agents",
  license: "MIT",
};

export default serperAgentInfo;
