
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





