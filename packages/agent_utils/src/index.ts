import { AgentFunctionInfo, defaultTestContext } from "graphai";

export const agentRunner = async (agentInfo: AgentFunctionInfo) => {
  const { agent, samples, inputs: inputSchema } = agentInfo;
  const ret = await Promise.all(
    samples.map(async (sample) => {
      const { params, inputs, result, graph } = sample;
      const flatInputs = Array.isArray(inputs) ? inputs : [];
      const namedInputs = Array.isArray(inputs) ? {} : inputs;

      const actual = await agent({
        ...defaultTestContext,
        params,
        inputs: flatInputs,
        inputSchema,
        namedInputs,
      });
      return actual;
    }),
  );
  return ret;
};
