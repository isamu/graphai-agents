import { AgentFunction } from "graphai";
import { EnvConfig, EnvFunc } from "./type";

export const nodeBrowserDetectAgentGenerator = (isNode: boolean, envConf: EnvConfig, envFunc: EnvFunc) => {
  const nodeBrowserDetectAgent: AgentFunction = async ({ params, namedInputs }) => {
    console.log(isNode);
    console.log(envConf);
    console.log(envFunc());
    return { params, namedInputs };
  };
  return nodeBrowserDetectAgent;
};
