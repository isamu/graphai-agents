"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeBrowserDetectAgent = void 0;
const node_browser_detect_agent_1 = require("./node_browser_detect_agent");
const node_browser_detect_agent_info_1 = require("./node_browser_detect_agent_info");
const envConf = {
    envType: "browser",
};
const envFunc = () => {
    return { message: "isbrowser" };
};
exports.nodeBrowserDetectAgent = (0, node_browser_detect_agent_1.nodeBrowserDetectAgentGenerator)(true, envConf, envFunc);
const nodeBrowserDetectAgentInfo = (0, node_browser_detect_agent_info_1.nodeBrowserDetectAgentInfoGenerator)(exports.nodeBrowserDetectAgent);
exports.default = nodeBrowserDetectAgentInfo;
