import { AgentFunction, AgentFunctionInfo } from "graphai";
export declare const runShellCommand: (commands: string[], path?: string) => Promise<{
    text?: string | unknown;
    error?: unknown;
    stderr?: unknown;
}>;
export declare const runShellAgent: AgentFunction<null, {
    text?: string | unknown;
    error?: unknown;
    stderr?: unknown;
}, {
    commands: string[];
    baseDir?: string;
    dirs?: string[];
}>;
declare const runShellAgentInfo: AgentFunctionInfo;
export default runShellAgentInfo;
