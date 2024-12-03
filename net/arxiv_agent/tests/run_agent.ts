import arxivAgent from "../src/arxiv_agent";
import { AgentFunctionInfo, defaultTestContext } from "graphai";

const run = async (agentInfo: AgentFunctionInfo) => {
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

const main = async () => {
  const result = await run(arxivAgent);
  console.log(result);
};

main();
