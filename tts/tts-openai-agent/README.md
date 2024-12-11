
# tts_openai_agent for GraphAI

OpenAI TTS agent

### Install

```sh
yarn add tts_openai_agent
```


### Usage

```typescript
import { GraphAI } from "graphai";
import { ttsOpenaiAgent } from "tts_openai_agent";

const agents = { ttsOpenaiAgent };

const graph = new GraphAI(graph_data, agents);
const result = await graph.run();
```

### Agents description
- ttsOpenaiAgent - OpenAI TTS agent

### Input/Output/Params Schema & samples
 - [ttsOpenaiAgent](https://github.com/receptron/graphai/blob/main/docs/agentDocs/tts/ttsOpenaiAgent.md)











