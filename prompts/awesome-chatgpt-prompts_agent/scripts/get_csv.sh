curl  https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/refs/heads/main/prompts.csv -o scripts/prompt.csv
jq -R -s -f scripts/csv2json.jq scripts/prompt.csv  > scripts/prompt.json
node scripts/conv.js
