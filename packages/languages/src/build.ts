import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

const DATA_DIR = path.join(process.cwd(), "data");
const OUT_DIR = path.join(process.cwd(), "dist");

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Example processing logic for languages.yml
const languagesFile = path.join(DATA_DIR, "languages.yml");
if (fs.existsSync(languagesFile)) {
  const fileContent = fs.readFileSync(languagesFile, "utf8");
  const languages = YAML.parse(fileContent);

  fs.writeFileSync(path.join(OUT_DIR, "languages.json"), JSON.stringify(languages, null, 2));
  console.log("Processed languages.yml -> languages.json");
} else {
  console.log("Warning: data/languages.yml not found");
}
