"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttsOpenaiAgent = void 0;
const openai_1 = __importDefault(require("openai"));
const ttsOpenaiAgent = async ({ namedInputs, params }) => {
    const { text } = namedInputs;
    const { apiKey, model, voice } = params;
    const openai = new openai_1.default({ apiKey });
    const response = await openai.audio.speech.create({
        model: model ?? "tts-1",
        voice: voice ?? "shimmer",
        input: text,
    });
    const buffer = Buffer.from(await response.arrayBuffer());
    return { buffer };
};
exports.ttsOpenaiAgent = ttsOpenaiAgent;
const ttsOpenaiAgentInfo = {
    name: "ttsOpenaiAgent",
    agent: exports.ttsOpenaiAgent,
    mock: exports.ttsOpenaiAgent,
    samples: [],
    description: "OpenAI TTS agent",
    category: ["tts"],
    author: "isamu arimoto",
    repository: "https://github.com/isamu/graphai-agents/tts/tts-openai-agent/",
    license: "MIT",
};
exports.default = ttsOpenaiAgentInfo;
