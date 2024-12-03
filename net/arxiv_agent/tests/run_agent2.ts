import arxivAgent from "../src/arxiv_agent";
import { GraphAI } from "graphai";
  
const main = async () => {
  const graphData = {
    version: 0.5,
    nodes: {
      arxiv: {
        agent: "arxivAgent",
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
        }
      },
    },
  };
  const graph = new GraphAI(graphData, { arxivAgent });
  const result = await graph.run(true);
  console.log(result);
};


main();
