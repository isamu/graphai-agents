import { nodeBrowserDetectAgentGenerator } from "./node_browser_detect_agent";
import { nodeBrowserDetectAgentInfoGenerator } from "./node_browser_detect_agent_info";
import { EnvConfig, EnvFunc } from "./type";

const envConf: EnvConfig = {
  envType: "browser",
};

const envFunc: EnvFunc = () => {
  return { message: "isbrowser" };
};

export const nodeBrowserDetectAgent = nodeBrowserDetectAgentGenerator(true, envConf, envFunc);

const nodeBrowserDetectAgentInfo = nodeBrowserDetectAgentInfoGenerator(nodeBrowserDetectAgent);

export default nodeBrowserDetectAgentInfo;
