"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notionAgent = void 0;
const notionAgent = async ({ params, namedInputs }) => {
    return { params, namedInputs };
};
exports.notionAgent = notionAgent;
const notionAgentInfo = {
    name: "notionAgent",
    agent: exports.notionAgent,
    mock: exports.notionAgent,
    samples: [],
    description: "Notion Agent",
    category: ["notion"],
    author: "Receptron team",
    repository: "https://github.com/receptron/graphai",
    license: "MIT",
};
exports.default = notionAgentInfo;
