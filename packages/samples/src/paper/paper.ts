import { pdf2textAgent } from "@graphai/pdf2text_agent";
import { fileReadAgent } from "@graphai/vanilla_node_agents";
import { openAIAgent } from "@graphai/openai_agent";
import { promptsAgent } from "@graphai/prompts";

import "dotenv/config";


import "@graphai/vanilla_node_agents";
import { GraphAI } from "graphai";

const main = async () => {
  const graphData = {
    version: 0.5,
    nodes: {
      file: {
        agent: "fileReadAgent",
        inputs: { array: ["2410.14735v2.pdf"] },
        params: { basePath: __dirname + "/" },
      },
      totext: {
        agent: "pdf2textAgent",
        inputs: {
          buffer: ":file.array.$0"
        },
      },
      prompt: {
        agent: "promptsAgent",
        params: {
          promptKey: "paper2",
        },
      },
      llm: {
        agent: "openAIAgent",
        inputs: {
          system: ":prompt.text",
          prompt: ":totext.text"
        },
      },
    },
  };
  const graph = new GraphAI(graphData, { pdf2textAgent, fileReadAgent, promptsAgent, openAIAgent });
  const result = await graph.run(true) as any;
  console.log(result.llm.text);
};

main();
