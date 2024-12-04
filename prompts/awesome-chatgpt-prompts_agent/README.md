
# @graphai/awesome_chatgpt_prompts_agent for GraphAI

prompt agent using https://github.com/f/awesome-chatgpt-prompts/

### Install

```sh
yarn add @graphai/awesome_chatgpt_prompts_agent
```


### Usage

```typescript
import { GraphAI } from "graphai";
import { awesomeChatgptPromptsAgent } from "@graphai/awesome_chatgpt_prompts_agent";

const agents = { awesomeChatgptPromptsAgent };

const graph = new GraphAI(graph_data, agents);
const result = await graph.run();
```

### Agents description
- awesomeChatgptPromptsAgent - awesomeChatgptPrompts Agent

### Input/Output/Params Schema & samples
 - [awesomeChatgptPromptsAgent](https://github.com/receptron/graphai/blob/main/docs/agentDocs/prompt/awesomeChatgptPromptsAgent.md)

### Input/Params example
 - awesomeChatgptPromptsAgent

```typescript
{
  "inputs": {},
  "params": {
    "promptKey": "travelGuide"
  }
}
```









## prompts list

https://github.com/isamu/graphai-agents/blob/main/prompts/awesome-chatgpt-prompts_agent/src/prompt.ts

