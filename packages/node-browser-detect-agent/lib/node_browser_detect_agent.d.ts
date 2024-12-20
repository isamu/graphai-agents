import { AgentFunction } from "graphai";
import { EnvConfig, EnvFunc } from "./type";
export declare const nodeBrowserDetectAgentGenerator: (isNode: boolean, envConf: EnvConfig, envFunc: EnvFunc) => AgentFunction;
