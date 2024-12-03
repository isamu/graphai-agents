import { AgentFunction, AgentFunctionInfo } from "graphai";
import { data } from "./prompt";

export const promptsAgent: AgentFunction<{promptKey:  keyof typeof data }> = async ({ params }) => {
  const { promptKey } = params;
  const prompt = data[promptKey];

  return {
    text: prompt
  }
};

const promptsAgentInfo: AgentFunctionInfo = {
  name: "promptsAgent",
  agent: promptsAgent,
  mock: promptsAgent,
  samples: [{
    inputs: {},
    params: {
      promptKey: "test"
    },
    result: {
      text: "this is test prompt.\n"
    },
  }],
  description: "Prompts Agent",
  category: ["prompt"],
  author: "Receptron team",
  repository: "https://github.com/receptron/graphai",
  license: "MIT",
};

export default promptsAgentInfo;
