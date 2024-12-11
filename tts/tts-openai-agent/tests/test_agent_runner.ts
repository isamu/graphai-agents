import * as packages from "../src/index";
import { agentTestRunner } from "@receptron/test_utils/lib/agent_test_runner";

const main = async () => {
  for await (const agentInfo of Object.values(packages)) {
    await agentTestRunner(agentInfo);
  }
};

main();
