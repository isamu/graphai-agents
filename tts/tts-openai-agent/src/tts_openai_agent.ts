import { AgentFunction, AgentFunctionInfo } from "graphai";
import OpenAI from "openai";

export const ttsOpenaiAgent: AgentFunction = async ({ namedInputs, params }) => {
  const { text } = namedInputs;
  const { apiKey, model, voice } = params;
  const openai = new OpenAI({ apiKey });

  const response = await openai.audio.speech.create({
    model: model ?? "tts-1",
    voice: voice ?? "shimmer",
    input: text,
  });
  const buffer = Buffer.from(await response.arrayBuffer());
  return { buffer };
};

const ttsOpenaiAgentInfo: AgentFunctionInfo = {
  name: "ttsOpenaiAgent",
  agent: ttsOpenaiAgent,
  mock: ttsOpenaiAgent,
  samples: [],
  description: "OpenAI TTS agent",
  category: ["tts"],
  author: "isamu arimoto",
  repository: "https://github.com/receptron/graphai/",
  license: "MIT",
};

export default ttsOpenaiAgentInfo;
