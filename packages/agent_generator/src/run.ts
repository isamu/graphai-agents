//仕様と必要な情報（npmやデータ）をテキストで用意する
// generatorを呼び出してスケルトンを作る
// agentの中身を実装する
// unit testを動かす -> 失敗したら結果やエラーを元に3を再実装
// できたら、documentもつくる
import * as fs from "node:fs";
import * as path from "node:path";

import { GraphAI } from "graphai";
import { openAIAgent } from "@graphai/openai_agent";
import { copyAgent } from "@graphai/vanilla";
import { fileReadAgent, fileWriteAgent } from "@graphai/vanilla_node_agents";

import "dotenv/config";

// npm create graphai-agent@latest  -- -c  --agentName hoge --description desc --author me --license ppp --category none --repository gitlab

const runShellCommand = (command: string, path: string) => {
  return new Promise((resolve, failed) => {
    const exec = require("child_process").exec;
    exec(command, { cwd: path }, function (error: any, stdout: any, stderr: any) {
      if (stdout) {
        resolve(stdout);
      }
      if (error) {
        failed(error);
      }
      if (stderr) {
        failed(stderr);
      }
    });
  });
};
const yarnAdd = (npmPackage: string, path: string) => {
  return new Promise((resolve, failed) => {
    const exec = require("child_process").exec;
    exec("yarn add " + npmPackage, { cwd: path }, function (error: any, stdout: any, stderr: any) {
      if (stdout) {
        console.log("stdout");
        resolve(stdout);
      }
      if (error) {
        console.log("error");
        failed(error);
      }
      if (stderr) {
        console.log("stderr");
        failed(stderr);
      }
    });
  });
};

const tools = [
  {
    type: "function",
    function: {
      name: "generate_package",
      description: "generate agent skelton",
      parameters: {
        type: "object",
        properties: {
          agentName: {
            type: "string",
            description: "The agent name.",
          },
          description: {
            type: "string",
            description: "Explain what the agent does",
          },
          category: {
            type: "string",
            description: "category of the agent.",
          },
        },
        required: ["agentName", "description", "category"],
      },
    },
  },
];

const convertToLowerCamelCaseAndSnakeCase = (input: string) => {
  const __normalized = input
    .trim()
    .replace(/[\s-_]+/g, " ")
    .toLowerCase()
    .split(" ");
  if (__normalized[__normalized.length - 1] !== "agent") {
    __normalized.push("agent");
  }
  const normalized = __normalized.join(" ");

  const lowerCamelCase = __normalized
    .map((word, index) => {
      if (index === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");

  const snakeCase = normalized.replace(/\s+/g, "_");
  const kebabCase = normalized.replace(/\s+/g, "-");

  return { lowerCamelCase, snakeCase, kebabCase, normalized };
};

const main = async () => {
  const graphData = {
    version: 0.5,
    nodes: {
      specFile: {
        agent: "fileReadAgent",
        inputs: {
          file: "template/spec.md",
        },
        params: {
          basePath: path.resolve(__dirname, ".."),
          outputType: "text",
        },
        isResult: true,
      },
      specLLM: {
        agent: "openAIAgent",
        inputs: {
          prompt: "以下の仕様を元に必要な情報を教えて下さい\n\n ${:specFile.data}",
          tools,
        },
      },
      createSkeleton: {
        agent: async (namedInputs: { data: { agentName: string; description: string; category: string } }) => {
          const outDir = path.resolve(__dirname, "..", "tmp");
          const { agentName, description, category } = namedInputs.data;
          const command = `npm create graphai-agent@latest  -- -c  --agentName "${agentName}" --description "${description}" --author me --license MIT --category "${category}" --outdir "${outDir}"`;
          const result = await runShellCommand(command, outDir);

          const { lowerCamelCase, snakeCase, kebabCase, normalized } = convertToLowerCamelCaseAndSnakeCase(agentName);
          const source = path.join("tmp", kebabCase, "src", snakeCase + ".ts");
          const dir = path.join("tmp", kebabCase);

          return {
            source,
            dir,
          };
        },
        inputs: {
          data: ":specLLM.tool.arguments",
        },
        isResult: true,
      },
      sourceFile: {
        agent: "fileReadAgent",
        inputs: {
          file: ":createSkeleton.source",
        },
        params: {
          basePath: path.resolve(__dirname, ".."),
          outputType: "text",
        },
      },
      llm: {
        agent: "openAIAgent",
        inputs: {
          system: ":specFile.data",
          prompt: "以下のソースを仕様に従って変更して\n\n ${:sourceFile.data}",
        },
        // console: {
        //  before:true
        //},
      },
      res: {
        agent: "copyAgent",
        inputs: {
          text: ":llm.text.codeBlock()",
        },
        isResult: true,
      },
      writeFile: {
        agent: "fileWriteAgent",
        inputs: {
          fileName: ":createSkeleton.source",
          text: ":llm.text.codeBlock()",
        },
        params: {
          basePath: path.resolve(__dirname, ".."),
          outputType: "text",
        },
      },
      yarnTest: {
        agent: async (inputs: { dir: string }) => {
          const { dir } = inputs;
          const result = await runShellCommand("yarn run test", path.resolve(__dirname, "..", dir));
          return {
            result,
          };
        },
        inputs: {
          data: ":writeFile.result",
          dir: ":createSkeleton.dir",
        },
        isResult: true,
      },
    },
  };
  const graph = new GraphAI(graphData, { openAIAgent, copyAgent, fileReadAgent, fileWriteAgent });
  const result = (await graph.run()) as any;
  console.log(result);
};

main();
