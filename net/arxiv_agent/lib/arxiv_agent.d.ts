import { AgentFunction, AgentFunctionInfo } from "graphai";
export declare const arxivAgent: AgentFunction<{
    searchQueryParams: any;
    sortBy: string;
    sortOrder: string;
    start: number;
    maxResults: number;
}>;
declare const arxivAgentInfo: AgentFunctionInfo;
export default arxivAgentInfo;
