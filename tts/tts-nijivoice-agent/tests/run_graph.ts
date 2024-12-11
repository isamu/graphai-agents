import "dotenv/config";
import { GraphAI } from "graphai";
import { ttsNijivoiceAgent } from "../src";
import { fileWriteAgent } from "@graphai/vanilla_node_agents";
import path from "path";

const main = async () => {
  const graphData = {
    version: 0.5,
    nodes: {
      fileDir: {
        value: "",
      },
      tts: {
        agent: "ttsNijivoiceAgent",
        inputs: { text: "こんにちは", voiceId: "b9277ce3-ba1c-4f6f-9a65-c05ca102ded0" },
        params: {},
      },
      writeFile: {
        agent: "fileWriteAgent",
        inputs: {
          file: "test.mp3",
          text: ":tts.buffer",
        },
        params: {
          baseDir: ":fileDir",
        },
        console: {
          before: true,
        },
      },
    }
  };
  
  const graph = new GraphAI(graphData, { ttsNijivoiceAgent, fileWriteAgent });
  graph.injectValue("fileDir", path.resolve(__dirname));
  const result = (await graph.run()) as any;
  console.log(result);
};

main();
