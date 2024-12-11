import fs from "fs";
import path from "path";
import "dotenv/config";
import { ttsNijivoiceAgent } from "../src/tts_nijivoice_agent";

const main = async () => {
  const namedInputs = { text: "こんにちは", voiceId: "b9277ce3-ba1c-4f6f-9a65-c05ca102ded0" };
  const params = {};

  const res = (await ttsNijivoiceAgent({ namedInputs, params, filterParams: {}, debugInfo: { verbose: false, nodeId: "test", retry: 5 } })) as any;
  const filePath = path.resolve("./test.mp3");
  await fs.promises.writeFile(filePath, res.buffer);
};

main();
