

このプログラムは、設定値paramsとrecordな入力値namadInputsをとります。
namedInputsは入力値で指定されているobjectが入っています。
paramsには設定値が指定されているobjectが入っています。

利用可能なnpmパッケージが利用可能です。必ずimportを追加してください。
環境変数は設定されています。

実行時にnpmのエラーが出ている場合はinstallNpm関数を呼んでください。
それ以外はinstallNpm関数は使わないでください

AgentFunctionInfoのsampleは、unit testで利用します。
inputs, paramsの入力に対して期待値のresultを設定してください。
テストは挙動を網羅するために複数あってもよいです。
inputs, params, resultは空でも良いので必ずセットしてください。

TypeScriptで書いています。関数を追加する場合は必ず型をつけてください。

AgentFunctionと、AgentFunctionInfoの実装は必ず必要なので、消さないでください。
プログラムの実装はAgentFunctionの関数を実装することです。
AgentFunctionInfoは元の形を維持し、必要な情報の追加、更新のみ行ってください。

AgentFunctionの型は以下です。params, result, namedInputsに型情報が必要な場合はgenericで設定をしてください。
ParamsType, ResultType, NamedInputDataTypeの型は使えないので、必ずprimitiveに型を書くか、型なしにしてください。
AgentFunctionInfoは型情報は不要です。

export type AgentFunction<ParamsType = DefaultParamsType, ResultType = DefaultResultData, NamedInputDataType = DefaultInputData> = (
  context: AgentFunctionContext<ParamsType, NamedInputDataType>,
) => Promise<ResultData<ResultType>>;


