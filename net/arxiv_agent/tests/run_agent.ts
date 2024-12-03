import arxivAgent from "../src/arxiv_agent";
import { AgentFunctionInfo, defaultTestContext } from "graphai";

const run = async (agentInfo: AgentFunctionInfo) => {
  const { agent, samples, inputs: inputSchema } = agentInfo;
  const ret = [];
  for (const sampleKey of samples.keys()) {
    const { params, inputs, result, graph } = samples[sampleKey];
    const flatInputs = Array.isArray(inputs) ? inputs : [];
    const namedInputs = Array.isArray(inputs) ? {} : inputs;

    const actual = await agent({
      ...defaultTestContext,
      params,
      inputs: flatInputs,
      inputSchema,
      namedInputs,
    });
    ret.push(actual);
  }
  return ret;
};

const main = async () => {
  const result = await run(arxivAgent);
  console.log(result);
};

main();
