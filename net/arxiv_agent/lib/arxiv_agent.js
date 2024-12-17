"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arxivAgent = void 0;
const arxiv_api_ts_1 = __importDefault(require("arxiv-api-ts"));
const arxivAgent = async ({ params, namedInputs }) => {
    const { searchQueryParams, sortBy, sortOrder, start, maxResults } = {
        ...params,
        ...namedInputs,
    };
    const papers = await (0, arxiv_api_ts_1.default)({
        searchQueryParams,
        sortBy,
        sortOrder,
        start,
        maxResults,
    });
    return papers;
};
exports.arxivAgent = arxivAgent;
const arxivAgentInfo = {
    name: "arxivAgent",
    agent: exports.arxivAgent,
    mock: exports.arxivAgent,
    samples: [
        {
            params: {
                searchQueryParams: [
                    {
                        include: [{ name: "LLM" }],
                    },
                ],
                sortBy: "lastUpdatedDate",
                sortOrder: "descending",
                start: 0,
                maxResults: 100,
            },
            inputs: {},
            result: {},
        },
    ],
    description: "Arxiv Agent",
    category: ["net"],
    author: "Receptron team",
    repository: "https://github.com/receptron/graphai-agents/tree/main/net/arxiv_agent",
    license: "MIT",
};
exports.default = arxivAgentInfo;
