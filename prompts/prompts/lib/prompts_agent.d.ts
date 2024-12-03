import { AgentFunction, AgentFunctionInfo } from "graphai";
import { data } from "./prompt";
export declare const promptsAgent: AgentFunction<{
    promptKey: keyof typeof data;
}>;
declare const promptsAgentInfo: AgentFunctionInfo;
export default promptsAgentInfo;
