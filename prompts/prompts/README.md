
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





