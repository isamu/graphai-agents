import { AgentFunction, AgentFunctionInfo } from "graphai";

import { exec } from "child_process";
import * as path from "node:path";

export const runShellCommand = (command: string, path?: string): Promise<{text?: string | unknown; error?: unknown, stderr?: unknown  }> => {
  return new Promise((resolve, reject) => {
    exec(command, { cwd: path ?? process.cwd() }, function (error: any, stdout: any, stderr: any) {
      if (error) {
        reject(error);
      } else if (stdout) {
        resolve({text: stdout, stderr});
      }
    });
  });
};

export const runShellAgent: AgentFunction<null, { text?: string | unknown; error?: unknown, stderr?: unknown }, { command: string; baseDir?: string; dirs?: string[] }> = async ({
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
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return {
        error: error.message,
      };
    }
    return { error };
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
        stderr: "",
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
