
# @graphai/pdf2text_agent for GraphAI



### Install

```sh
yarn add @graphai/pdf2text_agent
```


### Usage

```typescript
import { GraphAI } from "graphai";
import { pdf2textAgent } from "@graphai/pdf2text_agent";

const agents = { pdf2textAgent };

const graph = new GraphAI(graph_data, agents);
const result = await graph.run();
```

### Agents description
- pdf2textAgent - Pdf2text Agent

### Input/Output/Params Schema & samples
 - [pdf2textAgent](https://github.com/receptron/graphai-agents/blob/main/docs/agentDocs/documents/pdf2textAgent.md)

### Input/Params example
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










