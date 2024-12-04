
# @graphai/prompts for GraphAI



### Install

```sh
yarn add @graphai/prompts
```


### Usage

```typescript
import { GraphAI } from "graphai";
import { promptsAgent } from "@graphai/prompts";

const agents = { promptsAgent };

const graph = new GraphAI(graph_data, agents);
const result = await graph.run();
```

### Agents description
- promptsAgent - Prompts Agent

### Input/Output/Params Schema & samples
 - [promptsAgent](https://github.com/receptron/graphai/blob/main/docs/agentDocs/prompt/promptsAgent.md)

### Input/Params example
 - promptsAgent

```typescript
{
  "inputs": {},
  "params": {
    "promptKey": "test"
  }
}
```










