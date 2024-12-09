"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//仕様と必要な情報（npmやデータ）をテキストで用意する
// generatorを呼び出してスケルトンを作る
// agentの中身を実装する
// unit testを動かす -> 失敗したら結果やエラーを元に3を再実装
// できたら、documentもつくる
const path = __importStar(require("node:path"));
const graphai_1 = require("graphai");
const openai_agent_1 = require("@graphai/openai_agent");
const vanilla_1 = require("@graphai/vanilla");
const vanilla_node_agents_1 = require("@graphai/vanilla_node_agents");
const shell_utilty_agent_1 = require("@graphai/shell_utilty_agent");
require("dotenv/config");
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
                    command: "npm create graphai-agent@latest  -- -c  --agentName ${:packageInfo.kebabCase} --description '${:specLLM.tool.arguments.description}' --author me --license MIT --category ${:specLLM.tool.arguments.category} --outdir ${:packageBaseDir}",
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
    const graph = new graphai_1.GraphAI(graphData, {
        openAIAgent: openai_agent_1.openAIAgent,
        copyAgent: vanilla_1.copyAgent,
        pushAgent: vanilla_1.pushAgent,
        fileReadAgent: vanilla_node_agents_1.fileReadAgent,
        fileWriteAgent: vanilla_node_agents_1.fileWriteAgent,
        nestedAgent: vanilla_1.nestedAgent,
        runShellAgent: shell_utilty_agent_1.runShellAgent,
        stringCaseVariantsAgent: vanilla_1.stringCaseVariantsAgent,
        pathUtilsAgent: vanilla_node_agents_1.pathUtilsAgent,
    });
    graph.injectValue("templateBaseDir", path.resolve(__dirname, ".."));
    // graph.injectValue("packageBaseDir", "/Users/isamu/ss/llm/ai-generated-graphai-agents");
    graph.injectValue("packageBaseDir", path.resolve(__dirname, "..", "tmp"));
    graph.injectValue("specPrompt", "以下の仕様を元に必要な情報を教えて下さい。結果はgenerate_packageで返してください。npmパッケージが必要な場合はそれも一覧で返してください。");
    graph.injectValue("packageBaseDir", path.resolve(__dirname, "..", "tmp"));
    graph.injectValue("specPrompt", "以下の仕様を元に必要な情報を教えて下さい。結果はgenerate_packageで返してください。npmパッケージが必要な場合はそれも一覧で返してください。");
    graph.injectValue("implementPrompt", "以下のソースを仕様に従って変更して");
    graph.injectValue("errorPrompt", "エラー情報");
    const result = (await graph.run());
    console.log(result);
};
main();
