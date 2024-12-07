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
            specFile: {
                agent: "fileReadAgent",
                inputs: {
                    file: "template/spec.md",
                },
                params: {
                    baseDir: ":templateBaseDir",
                    outputType: "text",
                },
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
            createSkeleton: {
                agent: "runShellAgent",
                inputs: {
                    command: "npm create graphai-agent@latest  -- -c  --agentName ${:specLLM.tool.arguments.agentName} --description ${:specLLM.tool.arguments.description} --author me --license MIT --category ${:specLLM.tool.arguments.category} --outdir ${:packageBaseDir}",
                    baseDir: ":packageBaseDir",
                },
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
            srcFile: {
                agent: "pathUtilsAgent",
                params: { method: "join" },
                inputs: { dirs: [":packageInfo.kebabCase", "src", "${:packageInfo.snakeCase}.ts"] },
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
                    implementPrompt: ":implementPrompt",
                    errorPrompt: ":errorPrompt",
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
                                prompt: "${:implementPrompt}\n\n ${:sourceFile.data}\n\n\n${:errorPrompt}\n\n${:error}",
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
                                file: ":srcFile.path",
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
    const graph = new graphai_1.GraphAI(graphData, {
        openAIAgent: openai_agent_1.openAIAgent,
        copyAgent: vanilla_1.copyAgent,
        fileReadAgent: vanilla_node_agents_1.fileReadAgent,
        fileWriteAgent: vanilla_node_agents_1.fileWriteAgent,
        nestedAgent: vanilla_1.nestedAgent,
        runShellAgent: shell_utilty_agent_1.runShellAgent,
        stringCaseVariantsAgent: vanilla_1.stringCaseVariantsAgent,
        pathUtilsAgent: vanilla_node_agents_1.pathUtilsAgent,
    });
    graph.injectValue("packageBaseDir", path.resolve(__dirname, "..", "tmp"));
    graph.injectValue("templateBaseDir", path.resolve(__dirname, ".."));
    graph.injectValue("specPrompt", "以下の仕様を元に必要な情報を教えて下さい。結果はgenerate_packageで返してください");
    graph.injectValue("implementPrompt", "以下のソースを仕様に従って変更して");
    graph.injectValue("errorPrompt", "エラー情報");
    const result = (await graph.run());
    console.log(result);
};
main();
