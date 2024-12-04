
# @graphai/pdf2text_agent for GraphAI



### Install

```sh
yarn add @graphai/pdf2text_agent
```


### Usage

```typescript
import { GraphAI } from "graphai";
import { templateAgent } from "@graphai/pdf2text_agent";

const agents = { templateAgent };

const graph = new GraphAI(graph_data, agents);
const result = await graph.run();
```





