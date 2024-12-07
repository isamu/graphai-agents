//仕様と必要な情報（npmやデータ）をテキストで用意する
// generatorを呼び出してスケルトンを作る
// agentの中身を実装する
// unit testを動かす -> 失敗したら結果やエラーを元に3を再実装
// できたら、documentもつくる
import * as path from "node:path";

import { GraphAI } from "graphai";
import { openAIAgent } from "@graphai/openai_agent";
import { copyAgent, nestedAgent, stringCaseVariantsAgent } from "@graphai/vanilla";
import { fileReadAgent, fileWriteAgent } from "@graphai/vanilla_node_agents";
import { runShellAgent } from "@graphai/shell_utilty_agent";

import "dotenv/config";

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

const normalizedName = (input: string) => {
  const __normalized = input
    .trim()
    .replace(/[\s-_]+/g, " ")
    .toLowerCase()
    .split(" ");
  if (__normalized[__normalized.length - 1] !== "agent") {
    __normalized.push("agent");
  }
  const normalized = __normalized.join(" ");
  return normalized;
};

const main = async () => {
  const graphData = {
    version: 0.5,
    nodes: {
      packageBaseDir: {
        value: path.resolve(__dirname, "..", "tmp"),
      },
      specFile: {
        agent: "fileReadAgent",
        inputs: {
          file: "template/spec.md",
        },
        params: {
          baseDir: path.resolve(__dirname, ".."),
          outputType: "text",
        },
        isResult: true,
      },
      specLLM: {
        agent: "openAIAgent",
        inputs: {
          prompt: "以下の仕様を元に必要な情報を教えて下さい。結果はgenerate_packageで返してください\n\n ${:specFile.data}",
          tools,
        },
        console: { after: true },
      },
      createSkeleton: {
        agent: "runShellAgent",
        inputs: {
          command:
            "npm create graphai-agent@latest  -- -c  --agentName ${:specLLM.tool.arguments.agentName} --description ${:specLLM.tool.arguments.description} --author me --license MIT --category ${:specLLM.tool.arguments.category} --outdir ${:packageBaseDir}",
          baseDir: ":packageBaseDir",
        },
      },
      normalizedAgentName: {
        agent: async (namedInputs: { agentName: string }) => {
          return {
            text: normalizedName(namedInputs.agentName),
          };
        },
        inputs: {
          agentName: ":specLLM.tool.arguments.agentName",
        },
        isResult: true,
      },
      packageInfo: {
        agent: "stringCaseVariantsAgent",
        inputs: {
          text: ":normalizedAgentName.text",
        },
        isResult: true,
      },
      srcFile: {
        agent: async (namedInputs: { packageInfo: { kebabCase: string; snakeCase: string } }) => {
          const { snakeCase, kebabCase } = namedInputs.packageInfo;
          const source = path.join(kebabCase, "src", snakeCase + ".ts");
          return {
            text: source,
          };
        },
        inputs: {
          packageInfo: ":packageInfo",
        },
      },
      programmer: {
        agent: "nestedAgent",
        isResult: true,
        inputs: {
          waiting: ":createSkeleton",
          packageInfo: ":packageInfo",
          srcFile: ":srcFile",
          specFile: ":specFile",
          packageBaseDir: ":packageBaseDir",
        },
        graph: {
          loop: {
            while: ":yarnTest.error",
          },
          nodes: {
            error: {
              value: "",
              update: ":yarnTest.error",
            },
            sourceFile: {
              agent: "fileReadAgent",
              inputs: {
                file: ":srcFile.text",
              },
              params: {
                baseDir: ":packageBaseDir",
                outputType: "text",
              },
            },
            llm: {
              agent: "openAIAgent",
              inputs: {
                system: ":specFile.data",
                prompt: "以下のソースを仕様に従って変更して\n\n ${:sourceFile.data}\n\n\nエラー情報\n\n${:error}",
              },
              console: { before: true },
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
                file: ":srcFile.text",
                text: ":llm.text.codeBlock()",
              },
              params: {
                baseDir: ":packageBaseDir",
                outputType: "text",
              },
            },
            yarnInstall: {
              agent: "runShellAgent",
              params: {},
              inputs: {
                command: "yarn install",
                waiting: ":writeFile.result",
                dirs: [":packageBaseDir", ":packageInfo.kebabCase"],
              },
            },
            yarnTest: {
              agent: "runShellAgent",
              params: {},
              inputs: {
                command: "yarn run test",
                waiting: ":yarnInstall",
                dirs: [":packageBaseDir", ":packageInfo.kebabCase"],
              },
            },
          },
        },
      },
    },
  };
  const graph = new GraphAI(graphData, { openAIAgent, copyAgent, fileReadAgent, fileWriteAgent, nestedAgent, runShellAgent, stringCaseVariantsAgent });
  const result = (await graph.run()) as any;
  console.log(result);
};

main();
