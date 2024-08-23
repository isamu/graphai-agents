
# @graphai/slack_agent for GraphAI

Slack message agents for GraphAI.

### Install

```sh
yarn add @graphai/slack_agent
```

### Usage

```typescript
import { GraphAI } from "graphai";
import { slackAgent } from "@graphai/slack_agent";

const agents = { slackAgent };

const graph = new GraphAI(graph_data, agents);
const result = await graph.run();
```

