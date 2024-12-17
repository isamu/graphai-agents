# slackAgent

## Description

Slack Agent

## Schema

#### inputs

```json

{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "description": "",
  "type": "object",
  "properties": {
    "message": {
      "type": "array",
      "items": {
        "required": [],
        "properties": {}
      }
    }
  },
  "required": [
    "message"
  ]
}

````

## Input example of the next node

```json

[
  ":agentId"
]

````

## Samples

### Sample0

#### inputs

```json

{
  "message": [
    "Hello amateraru from GraphAI Slack agent!"
  ]
}

````

#### params

```json

{"post_channel":"#p_bootcamp_e_raycast_jp_amaterasu_dev"}

````

#### result

```json

{}

````

## Author

Receptron team

## Repository

https://github.com/receptron/graphai-agents/tree/main/net/slack_agent

## License

MIT

