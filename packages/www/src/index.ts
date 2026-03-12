import "./index.css";
import { detectLanguage } from "@pkgs/core";

const root = document.getElementById("root")!;

const searchBox = document.createElement("input");
const languageResult = document.createElement("div");
root.replaceChildren(searchBox, languageResult);

searchBox.oninput = handleSearch;
searchBox.placeholder = "Type some code here...";

languageResult.textContent = "No language detected.";

let timeout: number | null = null;
function handleSearch(event: Event) {
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    const query = (event.target as HTMLInputElement).value;
    const res = detectLanguage(query);
    if (!res) languageResult.textContent = "No language detected.";
    else {
      const pre = document.createElement("pre");
      pre.textContent = JSON.stringify(res, null, 2);
      languageResult.replaceChildren(pre);
    }
  }, 500);
}
