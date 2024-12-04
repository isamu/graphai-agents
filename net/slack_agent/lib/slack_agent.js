"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slackAgent = void 0;
const web_api_1 = require("@slack/web-api");
const slackAgent = async ({ params, namedInputs }) => {
    const token = process.env.SLACK_TOKEN ?? namedInputs.slack_token;
    const channel = params.post_channel;
    if (!token) {
        throw new Error("SLACK_TOKEN is not set in environment variables.");
    }
    if (!channel) {
        throw new Error("Slacl post_channel is not set in params.");
    }
    const message = namedInputs.message ?? params.message;
    const text = Array.isArray(message) ? message.join("\n") : message;
    const web = new web_api_1.WebClient(token);
    await web.chat.postMessage({
        text,
        channel,
    });
    return {};
};
exports.slackAgent = slackAgent;
const slackAgentInfo = {
    name: "slackAgent",
    agent: exports.slackAgent,
    mock: exports.slackAgent,
    samples: [{
            inputs: { message: ["Hello amateraru from GraphAI Slack agent!"] },
            params: {
                post_channel: "#p_bootcamp_e_raycast_jp_amaterasu_dev",
            },
            result: {},
        }],
    description: "Slack Agent",
    category: ["messaging"],
    author: "Receptron team",
    repository: "https://github.com/receptron/graphai-agents",
    license: "MIT",
};
exports.default = slackAgentInfo;
