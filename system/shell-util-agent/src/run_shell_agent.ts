import { AgentFunction, AgentFunctionInfo } from "graphai";

import { exec, spawn } from "child_process";
import * as path from "node:path";

export const runShellCommand = (commands: string[], path?: string): Promise<{ text?: string | unknown; error?: unknown; stderr?: unknown }> => {
  if (!Array.isArray(commands)) {
    throw new Error("runShellAgent error: command must be string[]");
  }
  return new Promise((resolve, reject) => {
    const [command, args] = [commands[0], commands.slice(1)];
    const results: string[] = [];
    const stderrs: string[] = [];
    const child = spawn(command, args, { cwd: path ?? process.cwd() });

    child.stdout.on("data", (data: string) => {
      results.push(data);
    });

    child.stderr.on("data", (data: string) => {
      stderrs.push(data);
    });

    child.stderr.on("data", (data) => {
      reject({ error: data, stdout: results.join(""), stderr: stderrs.join("") });
    });

    child.on("close", () => {
      resolve({ text: results.join(""), stderr: stderrs.join("") });
    });
  });
};

export const runShellAgent: AgentFunction<
  null,
  { text?: string | unknown; error?: unknown; stderr?: unknown },
  { commands: string[]; baseDir?: string; dirs?: string[] }
> = async ({ namedInputs }) => {
  const { baseDir, dirs, commands } = namedInputs;
  const dir = (() => {
    if (dirs) {
      return path.resolve(...dirs);
    }
    if (baseDir) {
      return baseDir;
    }
  })();

  try {
    const result = await runShellCommand(commands, dir);
    return result;
  } catch (err) {
    if (err instanceof Error) {
      return {
        error: err.message,
      };
    }
    const { error, stderr, stdout } = err as { error: unknown; stderr: unknown; stdout: unknown };
    return { error, stderr, stdout };
  }
};

const runShellAgentInfo: AgentFunctionInfo = {
  name: "runShellAgent",
  agent: runShellAgent,
  mock: runShellAgent,

  samples: [
    {
      params: {},
      inputs: { commands: ["echo", "1"], baseDir: "./" },
      result: {
        text: "1\n",
        stderr: "",
      },
    },
  ],
  description: "shell utility agent",
  category: ["system"],
  author: "isamu arimoto",
  repository: "https://github.com/receptron/graphai-agents/tree/main/system/shell-util-agent",
  license: "MIT",
};

export default runShellAgentInfo;
