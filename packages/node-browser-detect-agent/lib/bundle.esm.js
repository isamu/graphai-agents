const nodeBrowserDetectAgentGenerator = (isNode, envConf, envFunc) => {
    const nodeBrowserDetectAgent = async ({ params, namedInputs }) => {
        console.log(isNode);
        console.log(envConf);
        console.log(envFunc());
        return { params, namedInputs };
    };
    return nodeBrowserDetectAgent;
};

const nodeBrowserDetectAgentInfoGenerator = (nodeBrowserDetectAgent) => {
    const nodeBrowserDetectAgentInfo = {
        name: "nodeBrowserDetectAgent",
        agent: nodeBrowserDetectAgent,
        mock: nodeBrowserDetectAgent,
        samples: [
            {
                params: { a: "1" },
                inputs: { b: "2" },
                result: {
                    params: { a: "1" },
                    namedInputs: { b: "2" },
                },
            },
        ],
        description: "test agent",
        category: ["general"],
        author: "Receptron Team",
        repository: "https://github.com/receptron/graphai/",
        license: "MIT",
    };
    return nodeBrowserDetectAgentInfo;
};

const envConf = {
    envType: "Node",
};
const envFunc = () => {
    return { message: "isnode" };
};
const nodeBrowserDetectAgent = nodeBrowserDetectAgentGenerator(true, envConf, envFunc);
const nodeBrowserDetectAgentInfo = nodeBrowserDetectAgentInfoGenerator(nodeBrowserDetectAgent);

export { nodeBrowserDetectAgentInfo as nodeBrowserDetectAgent };
//# sourceMappingURL=bundle.esm.js.map
