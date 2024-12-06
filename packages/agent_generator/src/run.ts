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


// prime-factorization-agent
const readSpec = () => {
  const spec_doc = fs.readFileSync(path.resolve(__dirname, "..", "spec.md"), "utf8");
  return spec_doc;
};

const readSrc = () => {
  const spec_doc = fs.readFileSync(path.resolve(__dirname, "..", "zenn_agent.ts"), "utf8");
  return spec_doc;
};

const runShellCommand = (command: string, path: string) => {
  return new Promise((resolve, failed) => {
    const exec = require('child_process').exec;
    exec(command, { cwd: path},
         function(error: any, stdout: any, stderr: any) {
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
  })
};
const yarnAdd = (npmPackage: string, path: string) => {
  return new Promise((resolve, failed) => {
    const exec = require('child_process').exec;
    exec('yarn add ' + npmPackage, { cwd: path},
         function(error: any, stdout: any, stderr: any) {
           if (stdout) {
             console.log("stdout")
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
    
  })

};

const main = async () => {
  const spec = readSpec();
  const source = readSrc();
  // console.log(spec)

  // const res = await yarnAdd("@aws-sdk/client-s3",  '/tmp/agent/agent_template/')
  // console.log(res);
  const graphData = {
    version: 0.5,
    nodes: {
      specFile: {
        agent: "fileReadAgent",
        inputs: {
          file: "spec.md"
        },
        params: {
          basePath: path.resolve(__dirname, ".."),
          outputType: "text"
        },
        isResult: true,
      },
      sourceFile: {
        agent: "fileReadAgent",
        inputs: {
          file: "zenn_agent.ts"
        },
        params: {
          basePath: path.resolve(__dirname, ".."),
          outputType: "text"
        }
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
        // console: {
        //   after: true
        // },
      },
      writeFile: {
        agent: "fileWriteAgent",
        inputs: {
          fileName: "prime-factorization-agent/src/prime_factorization_agent.ts",
          text: ":llm.text.codeBlock()"
        },
        params: {
          basePath: path.resolve(__dirname, ".."),
          outputType: "text"
        }
      },
      yarnTest: {
        agent: async () => {
          const result = await runShellCommand("yarn run test", path.resolve(__dirname, ".."));
          return {
            result,
          };
        },
        inputs: {
          data: ":writeFile.result"
        },
        isResult: true,
      },
    }
  };
  const graph = new GraphAI(graphData, { openAIAgent, copyAgent,  fileReadAgent, fileWriteAgent  });
  const result = (await graph.run()) as any;
  console.log(result);

}

main();
