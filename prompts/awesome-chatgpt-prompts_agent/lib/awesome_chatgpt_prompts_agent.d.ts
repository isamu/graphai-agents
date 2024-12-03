import { AgentFunction, AgentFunctionInfo } from "graphai";
import { data } from "./prompt";
export declare const awesomeChatgptPromptsAgent: AgentFunction<{
    promptKey: keyof typeof data;
}>;
declare const awesomeChatgptPromptsAgentInfo: AgentFunctionInfo;
export default awesomeChatgptPromptsAgentInfo;
