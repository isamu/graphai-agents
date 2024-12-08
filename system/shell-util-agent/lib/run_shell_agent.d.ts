import { AgentFunction, AgentFunctionInfo } from "graphai";
export declare const runShellCommand: (command: string, path?: string) => Promise<unknown>;
export declare const runShellAgent: AgentFunction<null, {
    text?: string | unknown;
    error?: unknown;
}, {
    command: string;
    baseDir?: string;
    dirs?: string[];
}>;
declare const runShellAgentInfo: AgentFunctionInfo;
export default runShellAgentInfo;
