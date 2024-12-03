const fs = require("fs");
const path = require('path');

const main = () => {
  const ret = {};
  const base = path.resolve(__dirname + "/../prompts/");
  fs.readdirSync(base).forEach((file) => {
    if (file.match(/\.txt$/)) {
      const name = file.split(".")[0];
      ret[name] = fs.readFileSync(base + "/" + file, 'utf8');
      // console.log(base + "/" + file);
    }
    
  });
  // console.log(ret);

  fs.writeFileSync(
    "src/prompt.ts",
    "export const data = " + JSON.stringify(ret, null, 2),
  );
  
}

main();
