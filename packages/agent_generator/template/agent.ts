import { AgentFunction, AgentFunctionInfo } from "graphai";

export const zennAgent: AgentFunction = async ({ params, namedInputs }) => {
  return { params, namedInputs };
};

const zennAgentInfo: AgentFunctionInfo = {
  name: "zennAgent",
  agent: zennAgent,
  mock: zennAgent,

  samples: [{
    params: {a: "1"},
    inputs: {b: "2"},
    result: {
      params: {a: "1"},
      namedInputs: {b: "2"},
    },
  }],
  description: "read zenn from web",
  category: ["zenn"],
  author: "isamu",
  repository: "https://github.com/receptron/graphai/",
  license: "MIT",
};

export default zennAgentInfo;
