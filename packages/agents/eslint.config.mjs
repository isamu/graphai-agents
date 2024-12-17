import eslintBase from "../../config/eslint.config.base.mjs";

export default [
  {
    files: ["{src,test,samles}/**/*.{js,ts,yaml,yml,json}"],
  },
  {
    ignores: ["lib/**/*", "*.ts", "apiDoc/**/*", "apiDoc/*"],
  },
  ...eslintBase,
];
