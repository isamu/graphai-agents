
# @graphai/arxiv_agent for GraphAI



### Install

```sh
yarn add @graphai/arxiv_agent
```


### Usage

```typescript
import { GraphAI } from "graphai";
import { arxivAgent } from "@graphai/arxiv_agent";

const agents = { arxivAgent };

const graph = new GraphAI(graph_data, agents);
const result = await graph.run();
```

### Agents description
- arxivAgent - Arxiv Agent

### Input/Output/Params Schema & samples
 - [arxivAgent](https://github.com/receptron/graphai/blob/main/docs/agentDocs/net/arxivAgent.md)

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










