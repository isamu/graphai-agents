"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentRunner = void 0;
const graphai_1 = require("graphai");
const agentRunner = async (agentInfo) => {
    const { agent, samples, inputs: inputSchema } = agentInfo;
    const ret = await Promise.all(samples.map(async (sample) => {
        const { params, inputs /* , result, graph */ } = sample;
        const namedInputs = Array.isArray(inputs) ? {} : inputs;
        const actual = await agent({
            ...graphai_1.defaultTestContext,
            params,
            inputSchema,
            namedInputs,
        });
        return actual;
    }));
    return ret;
};
exports.agentRunner = agentRunner;
