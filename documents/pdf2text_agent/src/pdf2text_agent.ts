import { AgentFunction, AgentFunctionInfo, assert } from "graphai";
import pdf2md from "@opendocsg/pdf2md";
import { extractText, getDocumentProxy } from "unpdf";

export const pdf2textAgent: AgentFunction<{ type: string }, { text?: string }, { buffer: Buffer }> = async ({ params, namedInputs }) => {
  const { buffer } = namedInputs;
  const { type } = params;

  assert(!!buffer, "pdf2textAgent required buffer");

  if (type === "md" || type === "markdown") {
    const md_text = await pdf2md(buffer);
    return { text: md_text };
  }

  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text: pdf_text } = await extractText(pdf, { mergePages: true });
  return { text: pdf_text };
};

const pdf2textAgentInfo: AgentFunctionInfo = {
  name: "pdf2textAgent",
  agent: pdf2textAgent,
  mock: pdf2textAgent,
  samples: [{
    inputs: { buffer: Buffer.from("hellopdf")},
    params: { type: "md" },
    result: { test: "hello" },
  }],
  description: "Pdf2text Agent",
  category: ["documents"],
  author: "Receptron team",
  repository: "https://github.com/receptron/graphai",
  license: "MIT",
};

export default pdf2textAgentInfo;
