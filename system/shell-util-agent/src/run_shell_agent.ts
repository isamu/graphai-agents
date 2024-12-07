import { AgentFunction, AgentFunctionInfo } from "graphai";

import { exec } from "child_process";
import * as path from "node:path";

export const runShellCommand = (command: string, path?: string) => {
  // console.log(command, path);
  return new Promise((resolve, reject) => {
    // const exec = require("child_process").exec;
    exec(command, { cwd: path ?? process.cwd() }, function (error: any, stdout: any, stderr: any) {
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

export const runShellAgent: AgentFunction<null, { text?: string | unknown; error?: unknown }, { command: string; baseDir?: string; dirs?: string[] }> = async ({
  namedInputs,
}) => {
  const { baseDir, dirs, command } = namedInputs;
  const dir = (() => {
    if (dirs) {
      return path.resolve(...dirs);
    }
    if (baseDir) {
      return baseDir;
    }
  })();

  try {
    const result = await runShellCommand(command, dir);
    return {
      text: result,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return {
      error,
    };
  }
};

const runShellAgentInfo: AgentFunctionInfo = {
  name: "runShellAgent",
  agent: runShellAgent,
  mock: runShellAgent,

  samples: [
    {
      params: {},
      inputs: { command: "echo 1", baseDir: "./" },
      result: {
        text: "1\n",
      },
    },
  ],
  description: "shell utility agent",
  category: ["system"],
  author: "isamu arimoto",
  repository: "https://github.com/isamu/graphai-agents",
  license: "MIT",
};

export default runShellAgentInfo;
