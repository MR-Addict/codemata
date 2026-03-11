import { generateLanguages } from "./lib/generateLanguages.js";

async function main() {
  generateLanguages();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
