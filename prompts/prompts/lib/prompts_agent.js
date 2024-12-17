"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptsAgent = void 0;
const prompt_1 = require("./prompt");
const promptsAgent = async ({ params }) => {
    const { promptKey } = params;
    const prompt = prompt_1.data[promptKey];
    return {
        text: prompt,
    };
};
exports.promptsAgent = promptsAgent;
const promptsAgentInfo = {
    name: "promptsAgent",
    agent: exports.promptsAgent,
    mock: exports.promptsAgent,
    samples: [
        {
            inputs: {},
            params: {
                promptKey: "test",
            },
            result: {
                text: "this is test prompt.\n",
            },
        },
    ],
    description: "Prompts Agent",
    category: ["prompt"],
    author: "Receptron team",
    repository: "https://github.com/receptron/graphai-agents/tree/main/prompts/prompts",
    license: "MIT",
};
exports.default = promptsAgentInfo;
