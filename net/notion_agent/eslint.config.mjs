import eslintBase from "../../config/eslint.config.base.mjs";

export default [
  {
    files: ["{src,test}/**/*.{js,ts,yaml,yml,json}"],
  },
  {},
  ...eslintBase,
];
