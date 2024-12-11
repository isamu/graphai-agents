"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ttsNijivoiceAgent = void 0;
const nijovoiceApiKey = process.env.NIJIVOICE_API_KEY ?? "";
const ttsNijivoiceAgent = async ({ params, namedInputs }) => {
    const { apiKey } = params;
    const { voiceId, text } = namedInputs;
    const url = `https://api.nijivoice.com/api/platform/v1/voice-actors/${voiceId}/generate-voice`;
    const options = {
        method: "POST",
        headers: {
            "x-api-key": apiKey ?? nijovoiceApiKey,
            accept: "application/json",
            "content-type": "application/json",
        },
        body: JSON.stringify({
            format: "mp3",
            speed: "1.0",
            script: text,
        }),
    };
    try {
        const voiceRes = await fetch(url, options);
        const voiceJson = await voiceRes.json();
        const audioRes = await fetch(voiceJson.generatedVoice.audioFileDownloadUrl);
        const buffer = Buffer.from(await audioRes.arrayBuffer());
        return { buffer, generatedVoice: voiceJson.generatedVoice };
    }
    catch (e) {
        console.error(e);
    }
};
exports.ttsNijivoiceAgent = ttsNijivoiceAgent;
const ttsNijivoiceAgentInfo = {
    name: "ttsNijivoiceAgent",
    agent: exports.ttsNijivoiceAgent,
    mock: exports.ttsNijivoiceAgent,
    samples: [],
    description: "TTS nijivoice agent",
    category: ["tts"],
    author: "isamu arimoto",
    repository: "https://github.com/receptron/graphai/",
    license: "MIT",
};
exports.default = ttsNijivoiceAgentInfo;
