import "dotenv/config";
import fs from "fs";
import path from "path";
import { ttsOpenaiAgent } from "../src/tts_openai_agent";

const main = async () => {
  const namedInputs = { text: "hello, this is pen" };
  const params = {};

  const res = (await ttsOpenaiAgent({ namedInputs, params, filterParams: {}, debugInfo: { verbose: false, nodeId: "test", retry: 5 } })) as any;
  const filePath = path.resolve("./test.mp3");
  await fs.promises.writeFile(filePath, res.buffer);
};

main();
