
# tts_nijivoice_agent for GraphAI

TTS nijivoice agent

### Install

```sh
yarn add tts_nijivoice_agent
```


### Usage

```typescript
import { GraphAI } from "graphai";
import { ttsNijivoiceAgent } from "tts_nijivoice_agent";

const agents = { ttsNijivoiceAgent };

const graph = new GraphAI(graph_data, agents);
const result = await graph.run();
```

### Agents description
- ttsNijivoiceAgent - TTS nijivoice agent

### Input/Output/Params Schema & samples
 - [ttsNijivoiceAgent](https://github.com/receptron/graphai/blob/main/docs/agentDocs/tts/ttsNijivoiceAgent.md)











