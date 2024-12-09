//仕様と必要な情報（npmやデータ）をテキストで用意する
// generatorを呼び出してスケルトンを作る
// agentの中身を実装する
// unit testを動かす -> 失敗したら結果やエラーを元に3を再実装
// できたら、documentもつくる
import * as path from "node:path";

import { GraphAI } from "graphai";
import { openAIAgent } from "@graphai/openai_agent";
import { copyAgent, nestedAgent, stringCaseVariantsAgent, pushAgent } from "@graphai/vanilla";
import { fileReadAgent, fileWriteAgent, pathUtilsAgent } from "@graphai/vanilla_node_agents";
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
            description: "The agent name. Separate words with spaces.",
          },
          description: {
            type: "string",
            description: "Explain what the agent does",
          },
          category: {
            type: "string",
            description: "category of the agent.",
          },
          npmPackages: {
            type: "string",
            description: "list of npm package if you need. Separate packages with spaces. ",
          },
        },
        required: ["agentName", "description", "category"],
      },
    },
  },
];

const tools_npminstall = [
  {
    type: "function",
    function: {
      name: "installNpm",
      description: "install npm package",
      parameters: {
        type: "object",
        properties: {
          npmPackages: {
            type: "string",
            description: "list of npm package if you need. Separate packages with spaces. ",
          },
        },
        required: ["npmPackages"],
      },
    },
  },
];


const main = async () => {
  const graphData = {
    version: 0.5,
    nodes: {
      packageBaseDir: {
        value: "",
      },
      templateBaseDir: {
        value: "",
      },
      specPrompt: {
        value: "",
      },
      implementPrompt: {
        value: "",
      },
      errorPrompt: {
        value: "",
      },
      specFileReader: {
        agent: "fileReadAgent",
        inputs: {
          array: ["template/spec.md", "template/spec_base.md"],
        },
        params: {
          baseDir: ":templateBaseDir",
          outputType: "text",
        },
        console: { after: true },
        isResult: true,
      },
      specFile: {
        agent: "copyAgent",
        inputs: { data: "${:specFileReader.array.$0}\n\n${:specFileReader.array.$1}" },
        isResult: true,
      },
      specLLM: {
        agent: "openAIAgent",
        inputs: {
          prompt: "${:specPrompt}\n\n ${:specFile.data}",
          tools,
        },
        console: { after: true },
      },
      packageInfo: {
        agent: "stringCaseVariantsAgent",
        params: {
          suffix: "agent",
        },
        inputs: {
          text: ":specLLM.tool.arguments.agentName",
        },
        isResult: true,
      },
      createSkeleton: {
        agent: "runShellAgent",
        inputs: {
          command:
          "npm create graphai-agent@latest  -- -c  --agentName ${:packageInfo.kebabCase} --description '${:specLLM.tool.arguments.description}' --author me --license MIT --category ${:specLLM.tool.arguments.category} --outdir ${:packageBaseDir}",
          baseDir: ":packageBaseDir",
        },
      },
      yarnInstall: {
        agent: "runShellAgent",
        params: {},
        inputs: {
          command: "yarn install",
          dirs: [":packageBaseDir", ":packageInfo.kebabCase"],
        },
      },
      packageDir: {
        agent: "copyAgent",
        inputs: {
          text: "${:packageBaseDir}/${:packageInfo.kebabCase}",
        },
      },
      yarnAdd: {
        agent: "runShellAgent",
        if: ":specLLM.tool.arguments.npmPackages",
        defaultValue: {},
        inputs: {
          command: "yarn add ${:specLLM.tool.arguments.npmPackages}",
          baseDir: ":packageDir.text",
          wait: ":createSkeleton",
        },
        console: {
          before: true, after: true
        },
      },
      srcFile: {
        agent: "pathUtilsAgent",
        params: { method: "join" },
        inputs: { dirs: [":packageInfo.kebabCase", "src", "${:packageInfo.snakeCase}.ts"] },
      },
      programmer: {
        agent: "nestedAgent",
        isResult: true,
        inputs: {
          waiting: ":yarnAdd",
          packageInfo: ":packageInfo",
          srcFile: ":srcFile",
          specFile: ":specFile",
          packageBaseDir: ":packageBaseDir",
          implementPrompt: ":implementPrompt",
          errorPrompt: ":errorPrompt",
          npmPackages: [":specLLM.tool.arguments.npmPackages"],
        },
        graph: {
          loop: {
            while: ":yarnTest.error",
          },
          nodes: {
            npmPackages: {
              update: ":npmPackagesStack.array"
            },
            error: {
              value: "",
              update: ":yarnTest.stdout",
            },
            sourceFile: {
              agent: "fileReadAgent",
              inputs: {
                file: ":srcFile.path",
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
                prompt: "${:implementPrompt}\n\n###ソース###\n\n${:sourceFile.data}\n\n\n###npmは以下が追加さています###\n${:npmPackages.join(,)}\n\n###${:errorPrompt}###\n\n${:error}",
                // model: "o1-mini",
                // tools: tools_npminstall,
              },
              console: { before: true, after: true },
            },
            yarnAdd: {
              agent: "runShellAgent",
              if: ":llm.tool.arguments.npmPackages",
              inputs: {
                command: "yarn add ${:llm.tool.arguments.npmPackages}",
                dirs: [":packageBaseDir", ":packageInfo.kebabCase"],
              },
              defaultValue: {},
            },
            res: {
              agent: "copyAgent",
              inputs: {
                text: ":llm.text.codeBlock()",
              },
              isResult: true,
            },
            writeFile: {
              if: ":res.text",
              defaultValue: {},
              agent: "fileWriteAgent",
              inputs: {
                file: ":srcFile.path",
                text: ":llm.text.codeBlock()",
              },
              params: {
                baseDir: ":packageBaseDir",
                outputType: "text",
              },
              console: {
                before: true,
              },
            },
            yarnTest: {
              agent: "runShellAgent",
              params: {},
              inputs: {
                command: "yarn run test",
                waiting: ":writeFile",
                dirs: [":packageBaseDir", ":packageInfo.kebabCase"],
              },
              console: {
                after: true
              },
            },
            npmPackagesStack: {
              agent: "pushAgent",
              inputs: {
                array: ":npmPackages",
                items: [":llm.tool.arguments.npmPackages"]
              },
              console: {
                after: true
              },

            },
            /*
            isLoop: {
              agent: "copyAgent",
              inputs: { array: [":yarnTest.error", ":yarnAdd"]}
              },
            */
          },
        },
      },
      final: {
        agent: "runShellAgent",
        params: {},
        inputs: {
          command: "yarn run build && yarn run doc",
          dirs: [":packageBaseDir", ":packageInfo.kebabCase"],
          waiting: ":programmer",
        },
      },
      /*
      writeSpec: {
        agent: "fileWriteAgent",
        inputs: {
          file: "spec.txt",
          waiting: ":programmer",
          text: ":specFileReader.array.$0",
        },
        params: {
          baseDir: "${:packageBaseDir}/${:packageInfo.kebabCase}",
          outputType: "text",
        },
      },
      */
    },
  };
  const graph = new GraphAI(graphData, {
    openAIAgent,
    copyAgent,
    pushAgent,
    fileReadAgent,
    fileWriteAgent,
    nestedAgent,
    runShellAgent,
    stringCaseVariantsAgent,
    pathUtilsAgent,
  });

  graph.injectValue("templateBaseDir", path.resolve(__dirname, ".."));
  // graph.injectValue("packageBaseDir", "/Users/isamu/ss/llm/ai-generated-graphai-agents");
  graph.injectValue("packageBaseDir", path.resolve(__dirname, "..", "tmp"));
  graph.injectValue("specPrompt", "以下の仕様を元に必要な情報を教えて下さい。結果はgenerate_packageで返してください。npmパッケージが必要な場合はそれも一覧で返してください。");
  graph.injectValue("packageBaseDir", path.resolve(__dirname, "..", "tmp"));
  graph.injectValue(
    "specPrompt",
    "以下の仕様を元に必要な情報を教えて下さい。結果はgenerate_packageで返してください。npmパッケージが必要な場合はそれも一覧で返してください。",
  );
  graph.injectValue("implementPrompt", "以下のソースを仕様に従って変更して");
  graph.injectValue("errorPrompt", "エラー情報");
  const result = (await graph.run()) as any;
  console.log(result);
};

main();
