"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdf2textAgent = void 0;
const graphai_1 = require("graphai");
const pdf2md_1 = __importDefault(require("@opendocsg/pdf2md"));
const unpdf_1 = require("unpdf");
const pdf2textAgent = async ({ params, namedInputs }) => {
    const { buffer } = namedInputs;
    const { type } = params;
    (0, graphai_1.assert)(!!buffer, "pdf2textAgent required buffer");
    if (type === "md" || type === "markdown") {
        const md_text = await (0, pdf2md_1.default)(buffer);
        return { text: md_text };
    }
    const pdf = await (0, unpdf_1.getDocumentProxy)(new Uint8Array(buffer));
    const { text: pdf_text } = await (0, unpdf_1.extractText)(pdf, { mergePages: true });
    return { text: pdf_text };
};
exports.pdf2textAgent = pdf2textAgent;
const pdf2textAgentInfo = {
    name: "pdf2textAgent",
    agent: exports.pdf2textAgent,
    mock: exports.pdf2textAgent,
    samples: [
        {
            inputs: { buffer: Buffer.from("hellopdf") },
            params: { type: "md" },
            result: { test: "hello" },
        },
    ],
    description: "Pdf2text Agent",
    category: ["documents"],
    author: "Receptron team",
    repository: "https://github.com/receptron/graphai-agents/tree/main/documents/pdf2text_agent",
    license: "MIT",
};
exports.default = pdf2textAgentInfo;
