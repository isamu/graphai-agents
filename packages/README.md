GraphAI Agentを作るためのテンプレートです。

- テンプレートをコピー

agent_templateコピーする。名前は{name}_agent

```
cp -r agent_template notion_agent
```

- package.jsonの変更

nameを変更。このnameは、npmとして公開時の名前になるので、npmでユニークな名前とする。
複数公開する場合はnpmでorganizationアカウントを取得して@organization/name とする。

```
  "name": "@graphai/agent_template",
```

- ファイル名の変更

Agentのファイル名を変える。

```
mv src/template_agent.ts src/{name}_agent.ts
```

# ファイルの中身変更

- src/index.ts
- src/{name}_agent.ts
- tests/test_hello.ts

template_agentを{name}_agentに置換。

# url等の変更（必要なら)

- package.json
- src/{name}_agent.ts

内のagentの情報を変更

# テスト

- unit testを実行する
```
yarn run test
```
上記ファイルの変更などに問題なければテストが通る。
importの変更や、変数の書き換え不足があればエラーになるので、修正する

# 実装

`src/{name}_agent.ts`にagentを実装する

# document

```
yarn run doc
```
でpackage.jsonの情報を使ってREADMEを自動生成する

# test

test_hello.tsはagentにinputs, namedInputs, paramsを直接渡して実行するtest unit
test_agent_runner.tsは、AgentInfoのsample値を参照してtestを実行するtest runnerです。

