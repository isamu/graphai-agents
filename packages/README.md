# このレポジトリについて

GraphAI Agentを作るためのテンプレートです。

### テンプレートをコピー

agent_templateコピーする。名前は{name}_agent

```
cp -r agent_template {name}_agent
```

### package.jsonの変更

nameを変更。このnameは、npmとして公開時の名前になるので、npmでユニークな名前とする。
複数公開する場合はnpmでorganizationアカウントを取得して@organization/name とするのがよい。

```
  "name": "@{org}/{name}_agent",
```

### ファイル名の変更

templateからagentのファイル名に変更する

```
mv src/template_agent.ts src/{name}_agent.ts
```

### ファイルの中身変更

import時のファイル名と関数名を変更する。変更する対象は

- src/index.ts
- src/{name}_agent.ts
- tests/test_hello.ts

template_agentを{name}_agentに置換。

### url等のAgentの情報の変更（必要なら)

- package.json
  - パッケージの情報
  - レポジトリやissueのurl
  - 作者の情報
- src/{name}_agent.ts
  - agentの情報の変更(AgentInfo)

### テスト

unit testを実行する。モックの状態でもテストが動くので、依存関係のテストのためにテストをする

```
yarn run test
```

上記ファイルの変更などに問題なければテストが通る。
importの変更や、変数の書き換え不足があればエラーになるので、修正する

### Gitへ追加

テストが通ったタイミングでgit add する

{name}_templateディレクトリで
```
git add .
```

* node_modules, *~ はignoreされる

(build後、必要ならlib以下も追加)

# 実装

`src/{name}_agent.ts`にagentを実装する

# test

- test_hello.tsはagentにinputs, namedInputs, paramsを直接渡して実行するtest unit
- test_agent_runner.tsは、AgentInfoのsample値を参照してtestを実行するtest runnerです。


# document

```
yarn run doc
```
でpackage.jsonの情報を使ってREADMEを自動生成する

