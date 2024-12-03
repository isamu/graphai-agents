const dataSet = require("./prompt.json");
const fs = require("fs");

const trim = (message) => {
  return message.replace(/^"/, "").replace(/"$/, "").replace(/\(SLP\)/, "").replace("'", "")
};

const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .split(/\s+|-|`|\\|\//)
    .map((word, index) => {
      if (index === 0) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

const main = () => {
  const ret = {};
  dataSet.map(data => {
    ret[toCamelCase(trim(data['"act"']))] = trim(data['"prompt"']);
    // console.log(trim(data['"prompt"']));
  });
  console.log(ret);
  fs.writeFileSync(
    "src/prompt.ts",
    "export const data = " + JSON.stringify(ret, null, 2),
  );

  
}

main();
