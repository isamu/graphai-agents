
# @graphai/extra-agents for GraphAI

Extra agents for GraphAI.

### Install

```sh
yarn add @graphai/extra-agents
```


### Usage

```typescript
import { GraphAI } from "graphai";
import { 
  arxivAgent,
  awesomeChatgptPromptsAgent,
  pdf2textAgent,
  promptsAgent,
  serperAgent,
  slackAgent,
  ttsNijivoiceAgent,
  ttsOpenaiAgent
 } from "@graphai/extra-agents";

const agents = { 
  arxivAgent,
  awesomeChatgptPromptsAgent,
  pdf2textAgent,
  promptsAgent,
  serperAgent,
  slackAgent,
  ttsNijivoiceAgent,
  ttsOpenaiAgent
 };

const graph = new GraphAI(graph_data, agents);
const result = await graph.run();
```

### Agents description
- arxivAgent - Arxiv Agent
- awesomeChatgptPromptsAgent - awesomeChatgptPrompts Agent
- pdf2textAgent - Pdf2text Agent
- promptsAgent - Prompts Agent
- serperAgent - serper agent
- slackAgent - Slack Agent
- ttsNijivoiceAgent - TTS nijivoice agent
- ttsOpenaiAgent - OpenAI TTS agent

### Input/Output/Params Schema & samples
 - [arxivAgent](https://github.com/receptron/graphai-agents/blob/main/docs/agentDocs/net/arxivAgent.md)
 - [awesomeChatgptPromptsAgent](https://github.com/receptron/graphai-agents/blob/main/docs/agentDocs/prompt/awesomeChatgptPromptsAgent.md)
 - [pdf2textAgent](https://github.com/receptron/graphai-agents/blob/main/docs/agentDocs/documents/pdf2textAgent.md)
 - [promptsAgent](https://github.com/receptron/graphai-agents/blob/main/docs/agentDocs/prompt/promptsAgent.md)
 - [serperAgent](https://github.com/receptron/graphai-agents/blob/main/docs/agentDocs/net/serperAgent.md)
 - [slackAgent](https://github.com/receptron/graphai-agents/blob/main/docs/agentDocs/net/slackAgent.md)
 - [ttsNijivoiceAgent](https://github.com/receptron/graphai-agents/blob/main/docs/agentDocs/tts/ttsNijivoiceAgent.md)
 - [ttsOpenaiAgent](https://github.com/receptron/graphai-agents/blob/main/docs/agentDocs/tts/ttsOpenaiAgent.md)

### Input/Params example
 - arxivAgent

```typescript
{
  "inputs": {},
  "params": {
    "searchQueryParams": [
      {
        "include": [
          {
            "name": "LLM"
          }
        ]
      }
    ],
    "sortBy": "lastUpdatedDate",
    "sortOrder": "descending",
    "start": 0,
    "maxResults": 100
  }
}
```

 - awesomeChatgptPromptsAgent

```typescript
{
  "inputs": {},
  "params": {
    "promptKey": "travelGuide"
  }
}
```

 - pdf2textAgent

```typescript
{
  "inputs": {
    "buffer": {
      "type": "Buffer",
      "data": [
        104,
        101,
        108,
        108,
        111,
        112,
        100,
        102
      ]
    }
  },
  "params": {
    "type": "md"
  }
}
```

 - promptsAgent

```typescript
{
  "inputs": {},
  "params": {
    "promptKey": "test"
  }
}
```

 - serperAgent

```typescript
{
  "inputs": {
    "query": "apple inc"
  },
  "params": {}
}
```

 - slackAgent

```typescript
{
  "inputs": {
    "message": [
      "Hello amateraru from GraphAI Slack agent!"
    ]
  },
  "params": {
    "post_channel": "#p_bootcamp_e_raycast_jp_amaterasu_dev"
  }
}
```


### Environment Variables
 - serperAgent
   - SERPER_API_KEY
 - ttsNijivoiceAgent
   - NIJIVOICE_API_KEY
 - ttsOpenaiAgent
   - OPENAI_API_KEY

### Related Agent Packages
 - [@graphai/arxiv_agent](https://www.npmjs.com/package/@graphai/arxiv_agent)
 - [@graphai/awesome_chatgpt_prompts_agent](https://www.npmjs.com/package/@graphai/awesome_chatgpt_prompts_agent)
 - [@graphai/pdf2text_agent](https://www.npmjs.com/package/@graphai/pdf2text_agent)
 - [@graphai/serper_agent](https://www.npmjs.com/package/@graphai/serper_agent)
 - [@graphai/slack_agent](https://www.npmjs.com/package/@graphai/slack_agent)
 - [@graphai/tts_nijivoice_agent](https://www.npmjs.com/package/@graphai/tts_nijivoice_agent)
 - [@graphai/tts_openai_agent](https://www.npmjs.com/package/@graphai/tts_openai_agent)





