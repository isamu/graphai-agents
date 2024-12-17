
# @graphai/serper_agent for GraphAI

serper agent

### Install

```sh
yarn add @graphai/serper_agent
```


### Usage

```typescript
import { GraphAI } from "graphai";
import { serperAgent } from "@graphai/serper_agent";

const agents = { serperAgent };

const graph = new GraphAI(graph_data, agents);
const result = await graph.run();
```

### Agents description
- serperAgent - serper agent

### Input/Output/Params Schema & samples
 - [serperAgent](https://github.com/receptron/graphai-agents/blob/main/docs/agentDocs/net/serperAgent.md)

### Input/Params example
 - serperAgent

```typescript
{
  "inputs": {
    "query": "apple inc"
  },
  "params": {}
}
```


### Environment Variables
 - serperAgent
   - SERPER_API_KEY







