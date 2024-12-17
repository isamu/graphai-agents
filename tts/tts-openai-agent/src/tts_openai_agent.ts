import { AgentFunction, AgentFunctionInfo } from "graphai";
import OpenAI from "openai";

export const ttsOpenaiAgent: AgentFunction = async ({ namedInputs, params }) => {
  const { text } = namedInputs;
  const { apiKey, model, voice, throwError } = params;
  const openai = new OpenAI({ apiKey });

  try {
    const response = await openai.audio.speech.create({
      model: model ?? "tts-1",
      voice: voice ?? "shimmer",
      input: text,
    });
    const buffer = Buffer.from(await response.arrayBuffer());
    return { buffer };
  } catch (e) {
    if (throwError) {
      console.error(e);
      throw new Error("TTS OpenAI Error");
    }
    return {
      error: e,
    };
  }
};

const ttsOpenaiAgentInfo: AgentFunctionInfo = {
  name: "ttsOpenaiAgent",
  agent: ttsOpenaiAgent,
  mock: ttsOpenaiAgent,
  samples: [],
  description: "OpenAI TTS agent",
  category: ["tts"],
  author: "Receptron Team",
  repository: "https://github.com/receptron/graphai-agents/tree/main/tts/tts-openai-agent",
  license: "MIT",
  environmentVariables: ["OPENAI_API_KEY"],
};

export default ttsOpenaiAgentInfo;
