
名前: prime factorization agent
目的: 与えられた数字を素因数分解する
入力値: { input }
設定値: {}
出力値  { numbers: array[] }
必要なパッケージ: なし
必要な環境変数: なし

このプログラムは、設定値paramsとrecordな入力値namadInputsをとります。
namedInputsは入力値で指定されているobjectが入っています。
paramsには設定値が指定されているobjectが入っています。

利用可能なnpmパッケージが利用可能です。必ずimportを追加してください。
環境変数は設定されています。

AgentFunctionInfoのsampleは、unit testで利用します。
inputs, paramsの入力に対して期待値のresultを設定してください。
テストは挙動を網羅するために複数あってもよいです。
inputs, params, resultは空でも良いので必ずセットしてください。

TypeScriptで書いています。関数を追加する場合は必ず型をつけてください。

AgentFunctionの型は以下です。params, result, namedInputsに型情報が必要な場合はgenericで設定をしてください。
export type AgentFunction<ParamsType = DefaultParamsType, ResultType = DefaultResultData, NamedInputDataType = DefaultInputData> = (
  context: AgentFunctionContext<ParamsType, NamedInputDataType>,
) => Promise<ResultData<ResultType>>;
