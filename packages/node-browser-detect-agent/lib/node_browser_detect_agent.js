"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeBrowserDetectAgentGenerator = void 0;
const nodeBrowserDetectAgentGenerator = (isNode, envConf, envFunc) => {
    const nodeBrowserDetectAgent = async ({ params, namedInputs }) => {
        console.log(isNode);
        console.log(envConf);
        console.log(envFunc());
        return { params, namedInputs };
    };
    return nodeBrowserDetectAgent;
};
exports.nodeBrowserDetectAgentGenerator = nodeBrowserDetectAgentGenerator;
