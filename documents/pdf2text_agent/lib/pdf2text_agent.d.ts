import { AgentFunction, AgentFunctionInfo } from "graphai";
export declare const pdf2textAgent: AgentFunction<{
    type: string;
}, {
    text?: string;
}, {
    buffer: Buffer;
}>;
declare const pdf2textAgentInfo: AgentFunctionInfo;
export default pdf2textAgentInfo;
