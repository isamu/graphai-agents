
# @graphai/tts_nijivoice_agent for GraphAI

nijivoice TTS agent

### Install

```sh
yarn add @graphai/tts_nijivoice_agent
```


### Usage

```typescript
import { GraphAI } from "graphai";
import { ttsNijivoiceAgent } from "@graphai/tts_nijivoice_agent";

const agents = { ttsNijivoiceAgent };

const graph = new GraphAI(graph_data, agents);
const result = await graph.run();
```

### Agents description
- ttsNijivoiceAgent - TTS nijivoice agent

### Input/Output/Params Schema & samples
 - [ttsNijivoiceAgent](https://github.com/receptron/graphai-agents/blob/main/docs/agentDocs/tts/ttsNijivoiceAgent.md)



### Environment Variables
 - ttsNijivoiceAgent
   - NIJIVOICE_API_KEY







