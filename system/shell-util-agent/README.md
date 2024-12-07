
# shell_util_agent for GraphAI

shell utility agent

### Install

```sh
yarn add shell_util_agent
```


### Usage

```typescript
import { GraphAI } from "graphai";
import { runShellAgent } from "shell_util_agent";

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
    "command": "echo 1"
  },
  "params": {
    "baseDir": "./"
  }
}
```










