
# @graphai/shell_utilty_agent for GraphAI

shell utilty agent

### Install

```sh
yarn add @graphai/shell_utilty_agent
```


### Usage

```typescript
import { GraphAI } from "graphai";
import { runShellAgent } from "@graphai/shell_utilty_agent";

const agents = { runShellAgent };

const graph = new GraphAI(graph_data, agents);
const result = await graph.run();
```

### Agents description
- runShellAgent - shell utility agent

### Input/Output/Params Schema & samples
 - [runShellAgent](https://github.com/receptron/graphai/blob/main/docs/agentDocs/system/runShellAgent.md)

### Input/Params example
 - runShellAgent

```typescript
{
  "inputs": {
    "commands": [
      "echo",
      "1"
    ],
    "baseDir": "./"
  },
  "params": {}
}
```










