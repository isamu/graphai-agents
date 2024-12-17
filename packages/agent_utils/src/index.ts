import { AgentFunctionInfo, defaultTestContext } from "graphai";

export const agentRunner = async (agentInfo: AgentFunctionInfo) => {
  const { agent, samples, inputs: inputSchema } = agentInfo;
  const ret = await Promise.all(
    samples.map(async (sample) => {
      const { params, inputs /* , result, graph */ } = sample;
      const namedInputs = Array.isArray(inputs) ? {} : inputs;

      const actual = await agent({
        ...defaultTestContext,
        params,
        inputSchema,
        namedInputs,
      });
      return actual;
    }),
  );
  return ret;
};
