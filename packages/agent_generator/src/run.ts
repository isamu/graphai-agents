//仕様と必要な情報（npmやデータ）をテキストで用意する
// generatorを呼び出してスケルトンを作る
// agentの中身を実装する
// unit testを動かす -> 失敗したら結果やエラーを元に3を再実装
// できたら、documentもつくる
import * as fs from "node:fs";
import * as path from "node:path";

import { GraphAI } from "graphai";
import { openAIAgent } from "@graphai/openai_agent";
import { copyAgent, nestedAgent } from "@graphai/vanilla";
import { fileReadAgent, fileWriteAgent } from "@graphai/vanilla_node_agents";

import "dotenv/config";

// npm create graphai-agent@latest  -- -c  --agentName hoge --description desc --author me --license ppp --category none --repository gitlab

const runShellCommand = (command: string, path: string) => {
  return new Promise((resolve, reject) => {
    const exec = require("child_process").exec;
    exec(command, { cwd: path }, function (error: any, stdout: any, stderr: any) {
      if (error) {
        reject([error, stdout].join("\n"));
      } else if (stderr) {
        reject([stderr, stdout].join("\n"));
      } else if (stdout) {
        resolve(stdout);
      }
    });
  });
};
const yarnAdd = (npmPackage: string, path: string) => {
  return runShellCommand("yarn add " + npmPackage, path);
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
      packageBaseDir: {
        value:  path.resolve(__dirname, "..", "tmp"),
      },
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
          prompt: "以下の仕様を元に必要な情報を教えて下さい。結果はgenerate_packageで返してください\n\n ${:specFile.data}",
          tools,
        },
        console: {after: true},
      },
      createSkeleton: {
        agent: async (namedInputs: { data: { agentName: string; description: string; category: string }, baseDir: string }) => {
          const outDir = namedInputs.baseDir;
          const { agentName, description, category } = namedInputs.data;
          const command = `npm create graphai-agent@latest  -- -c  --agentName "${agentName}" --description "${description}" --author me --license MIT --category "${category}" --outdir "${outDir}"`;
          const result = await runShellCommand(command, outDir);

          const { lowerCamelCase, snakeCase, kebabCase, normalized } = convertToLowerCamelCaseAndSnakeCase(agentName);
          const source = path.join(kebabCase, "src", snakeCase + ".ts");

          return {
            source,
            dir: kebabCase,
          };
        },
        inputs: {
          data: ":specLLM.tool.arguments",
          baseDir: ":packageBaseDir",
        },
        isResult: true,
      },
      programmer: {
        agent: "nestedAgent",
        isResult: true,
        inputs: {
          sourceFilePath: ":createSkeleton.source",
          agentDir: ":createSkeleton.dir",
          specData: ":specFile.data",
          packageBaseDir: ":packageBaseDir",
        },
        graph: {
          loop:{
            while: ":yarnTest.error"
          },
          nodes:{
            error: {
              value: "",
              update: ":yarnTest.error",
            },
            sourceFile: {
              agent: "fileReadAgent",
              inputs: {
                file: ":sourceFilePath",
              },
              params: {
                basePath: ":packageBaseDir",
                outputType: "text",
              },
            },
            llm: {
              agent: "openAIAgent",
              inputs: {
                system: ":specData",
                prompt: "以下のソースを仕様に従って変更して\n\n ${:sourceFile.data}\n\n\nエラー情報\n\n${:error}",
              },
              console: { before: true }
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
                fileName: ":sourceFilePath",
                text: ":llm.text.codeBlock()",
              },
              params: {
                basePath: ":packageBaseDir",
                outputType: "text",
              },
            },
            yarnTest: {
              agent: async (inputs: { dir: string, packageBaseDir: string }) => {
                const { dir, packageBaseDir } = inputs;
                try {
                  await runShellCommand("yarn install", path.resolve(packageBaseDir, dir));
                  const result = await runShellCommand("yarn run test", path.resolve(packageBaseDir, dir));
                  return {
                    result,
                  };
                } catch (e) {
                  console.log("ERROR");
                  // console.log(e);
                  if (e instanceof Error) {
                    console.log(e.message);
                    return {
                      error: e.message
                    };
                  }
                  return {
                    error: e
                  };
                }
              },
              inputs: {
                data: ":writeFile.result",
                dir: ":agentDir",
                packageBaseDir: ":packageBaseDir",
              },
              isResult: true,
            }
          }
        }
      },
    },
  };
  const graph = new GraphAI(graphData, { openAIAgent, copyAgent, fileReadAgent, fileWriteAgent, nestedAgent });
  const result = (await graph.run()) as any;
  console.log(result);
};

main();
