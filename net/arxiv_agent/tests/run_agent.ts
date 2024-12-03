import arxivAgent from "../src/arxiv_agent";
import { agentRunner } from "graphai_agent_utils";
  
const main = async () => {
  const result = await agentRunner(arxivAgent);
  console.log(result);
};

main();
