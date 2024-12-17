# pdf2textAgent

## Description

Pdf2text Agent

## Schema

#### inputs

```json

{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "description": "",
  "type": "object",
  "properties": {
    "buffer": {
      "type": "object",
      "properties": {
        "0": {
          "type": "number"
        },
        "1": {
          "type": "number"
        },
        "2": {
          "type": "number"
        },
        "3": {
          "type": "number"
        },
        "4": {
          "type": "number"
        },
        "5": {
          "type": "number"
        },
        "6": {
          "type": "number"
        },
        "7": {
          "type": "number"
        },
        "readBigUInt64LE": {},
        "readBigUInt64BE": {},
        "readBigUint64LE": {},
        "readBigUint64BE": {},
        "readBigInt64LE": {},
        "readBigInt64BE": {},
        "writeBigUInt64LE": {},
        "writeBigUInt64BE": {},
        "writeBigUint64LE": {},
        "writeBigUint64BE": {},
        "writeBigInt64LE": {},
        "writeBigInt64BE": {},
        "readUIntLE": {},
        "readUInt32LE": {},
        "readUInt16LE": {},
        "readUInt8": {},
        "readUIntBE": {},
        "readUInt32BE": {},
        "readUInt16BE": {},
        "readUintLE": {},
        "readUint32LE": {},
        "readUint16LE": {},
        "readUint8": {},
        "readUintBE": {},
        "readUint32BE": {},
        "readUint16BE": {},
        "readIntLE": {},
        "readInt32LE": {},
        "readInt16LE": {},
        "readInt8": {},
        "readIntBE": {},
        "readInt32BE": {},
        "readInt16BE": {},
        "writeUIntLE": {},
        "writeUInt32LE": {},
        "writeUInt16LE": {},
        "writeUInt8": {},
        "writeUIntBE": {},
        "writeUInt32BE": {},
        "writeUInt16BE": {},
        "writeUintLE": {},
        "writeUint32LE": {},
        "writeUint16LE": {},
        "writeUint8": {},
        "writeUintBE": {},
        "writeUint32BE": {},
        "writeUint16BE": {},
        "writeIntLE": {},
        "writeInt32LE": {},
        "writeInt16LE": {},
        "writeInt8": {},
        "writeIntBE": {},
        "writeInt32BE": {},
        "writeInt16BE": {},
        "readFloatLE": {},
        "readFloatBE": {},
        "readDoubleLE": {},
        "readDoubleBE": {},
        "writeFloatLE": {},
        "writeFloatBE": {},
        "writeDoubleLE": {},
        "writeDoubleBE": {},
        "asciiSlice": {},
        "base64Slice": {},
        "base64urlSlice": {},
        "latin1Slice": {},
        "hexSlice": {},
        "ucs2Slice": {},
        "utf8Slice": {},
        "asciiWrite": {},
        "base64Write": {},
        "base64urlWrite": {},
        "latin1Write": {},
        "hexWrite": {},
        "ucs2Write": {},
        "utf8Write": {},
        "parent": {
          "type": "object",
          "properties": {},
          "required": []
        },
        "offset": {
          "type": "number"
        },
        "copy": {},
        "toString": {},
        "equals": {},
        "inspect": {},
        "compare": {},
        "indexOf": {},
        "lastIndexOf": {},
        "includes": {},
        "fill": {},
        "write": {},
        "toJSON": {},
        "subarray": {},
        "slice": {},
        "swap16": {},
        "swap32": {},
        "swap64": {},
        "toLocaleString": {}
      },
      "required": [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "readBigUInt64LE",
        "readBigUInt64BE",
        "readBigUint64LE",
        "readBigUint64BE",
        "readBigInt64LE",
        "readBigInt64BE",
        "writeBigUInt64LE",
        "writeBigUInt64BE",
        "writeBigUint64LE",
        "writeBigUint64BE",
        "writeBigInt64LE",
        "writeBigInt64BE",
        "readUIntLE",
        "readUInt32LE",
        "readUInt16LE",
        "readUInt8",
        "readUIntBE",
        "readUInt32BE",
        "readUInt16BE",
        "readUintLE",
        "readUint32LE",
        "readUint16LE",
        "readUint8",
        "readUintBE",
        "readUint32BE",
        "readUint16BE",
        "readIntLE",
        "readInt32LE",
        "readInt16LE",
        "readInt8",
        "readIntBE",
        "readInt32BE",
        "readInt16BE",
        "writeUIntLE",
        "writeUInt32LE",
        "writeUInt16LE",
        "writeUInt8",
        "writeUIntBE",
        "writeUInt32BE",
        "writeUInt16BE",
        "writeUintLE",
        "writeUint32LE",
        "writeUint16LE",
        "writeUint8",
        "writeUintBE",
        "writeUint32BE",
        "writeUint16BE",
        "writeIntLE",
        "writeInt32LE",
        "writeInt16LE",
        "writeInt8",
        "writeIntBE",
        "writeInt32BE",
        "writeInt16BE",
        "readFloatLE",
        "readFloatBE",
        "readDoubleLE",
        "readDoubleBE",
        "writeFloatLE",
        "writeFloatBE",
        "writeDoubleLE",
        "writeDoubleBE",
        "asciiSlice",
        "base64Slice",
        "base64urlSlice",
        "latin1Slice",
        "hexSlice",
        "ucs2Slice",
        "utf8Slice",
        "asciiWrite",
        "base64Write",
        "base64urlWrite",
        "latin1Write",
        "hexWrite",
        "ucs2Write",
        "utf8Write",
        "parent",
        "offset",
        "copy",
        "toString",
        "equals",
        "inspect",
        "compare",
        "indexOf",
        "lastIndexOf",
        "includes",
        "fill",
        "write",
        "toJSON",
        "subarray",
        "slice",
        "swap16",
        "swap32",
        "swap64",
        "toLocaleString"
      ]
    }
  },
  "required": [
    "buffer"
  ]
}

````

## Input example of the next node

```json

[
  ":agentId",
  ":agentId.test"
]

````

## Samples

### Sample0

#### inputs

```json

{
  "buffer": {
    "type": "Buffer",
    "data": [
      104,
      101,
      108,
      108,
      111,
      112,
      100,
      102
    ]
  }
}

````

#### params

```json

{"type":"md"}

````

#### result

```json

{
  "test": "hello"
}

````

## Author

Receptron team

## Repository

https://github.com/receptron/graphai-agents/tree/main/documents/pdf2text_agent

## License

MIT

