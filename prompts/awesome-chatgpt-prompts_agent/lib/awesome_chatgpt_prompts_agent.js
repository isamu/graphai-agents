"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awesomeChatgptPromptsAgent = void 0;
const prompt_1 = require("./prompt");
const awesomeChatgptPromptsAgent = async ({ params }) => {
    const { promptKey } = params;
    const prompt = prompt_1.data[promptKey];
    return {
        text: prompt
    };
};
exports.awesomeChatgptPromptsAgent = awesomeChatgptPromptsAgent;
const awesomeChatgptPromptsAgentInfo = {
    name: "awesomeChatgptPromptsAgent",
    agent: exports.awesomeChatgptPromptsAgent,
    mock: exports.awesomeChatgptPromptsAgent,
    samples: [{
            inputs: {},
            params: {
                promptKey: "travelGuide"
            },
            result: {
                text: 'I want you to act as a travel guide. I will write you my location and you will suggest a place to visit near my location. In some cases'
            },
        }],
    description: "awesomeChatgptPrompts Agent",
    category: ["prompt"],
    author: "Receptron team",
    repository: "https://github.com/receptron/graphai",
    license: "MIT",
};
exports.default = awesomeChatgptPromptsAgentInfo;
