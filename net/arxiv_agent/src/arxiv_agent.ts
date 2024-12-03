import { AgentFunction, AgentFunctionInfo } from "graphai";
import search from "arXiv-api-ts";

export const arxivAgent: AgentFunction<{ searchQueryParams: any; sortBy: string; sortOrder: string; start: number; maxResults: number }> = async ({
  params,
  namedInputs,
}) => {
  const { searchQueryParams, sortBy, sortOrder, start, maxResults } = {
    ...params,
    ...namedInputs,
  };

  const papers = await search({
    searchQueryParams,
    sortBy,
    sortOrder,
    start,
    maxResults,
  });
  return papers;
};

const arxivAgentInfo: AgentFunctionInfo = {
  name: "arxivAgent",
  agent: arxivAgent,
  mock: arxivAgent,

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
  repository: "https://github.com/receptron/graphai-agents",
  license: "MIT",
};

export default arxivAgentInfo;
