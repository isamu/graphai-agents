
# @graphai/extra-agents for GraphAI

Agents for GraphAI.

### Install

```sh
yarn add @graphai/extra-agents
```


### Usage

```typescript
import { GraphAI } from "graphai";
import { ttsNijivoiceAgent, ttsOpenaiAgent } from "@graphai/extra-agents";

const agents = { ttsNijivoiceAgent, ttsOpenaiAgent };

const graph = new GraphAI(graph_data, agents);
const result = await graph.run();
```

### Agents description
- ttsNijivoiceAgent - TTS nijivoice agent
- ttsOpenaiAgent - OpenAI TTS agent

### Input/Output/Params Schema & samples
 - [ttsNijivoiceAgent](https://github.com/receptron/agents/blob/main/docs/agentDocs/tts/ttsNijivoiceAgent.md)
 - [ttsOpenaiAgent](https://github.com/receptron/agents/blob/main/docs/agentDocs/tts/ttsOpenaiAgent.md)



### Environment Variables
 - ttsNijivoiceAgent
   - NIJIVOICE_API_KEY
 - ttsOpenaiAgent
   - OPENAI_API_KEY

### Related Agent Packages
 - [@graphai/tts_nijivoice_agent](https://www.npmjs.com/package/@graphai/tts_nijivoice_agent)
 - [@graphai/tts_openai_agent](https://www.npmjs.com/package/@graphai/tts_openai_agent)





