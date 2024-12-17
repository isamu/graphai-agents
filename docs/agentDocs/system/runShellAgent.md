# runShellAgent

## Description

shell utility agent

## Schema

#### inputs

```json

{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "description": "",
  "type": "object",
  "properties": {
    "commands": {
      "type": "array",
      "items": {
        "required": [],
        "properties": {}
      }
    },
    "baseDir": {
      "type": "string",
      "minLength": 1
    }
  },
  "required": [
    "commands",
    "baseDir"
  ]
}

````

## Input example of the next node

```json

[
  ":agentId",
  ":agentId.text",
  ":agentId.stderr"
]

````

## Samples

### Sample0

#### inputs

```json

{
  "commands": [
    "echo",
    "1"
  ],
  "baseDir": "./"
}

````

#### params

```json

{}

````

#### result

```json

{
  "text": "1\n",
  "stderr": ""
}

````

## Author

isamu arimoto

## Repository

https://github.com/receptron/graphai-agents/tree/main/system/shell-util-agent

## License

MIT

