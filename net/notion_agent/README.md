
# @graphai/notion_agent for GraphAI



### Install

```sh
yarn add @graphai/notion_agent
```


### Usage

```typescript
import { GraphAI } from "graphai";
import { notionAgent } from "@graphai/notion_agent";

const agents = { notionAgent };

const graph = new GraphAI(graph_data, agents);
const result = await graph.run();
```

### Agents description
- notionAgent - Notion Agent

### Input/Output/Params Schema & samples
 - [notionAgent](https://github.com/receptron/graphai/blob/main/docs/agentDocs/notion/notionAgent.md)











