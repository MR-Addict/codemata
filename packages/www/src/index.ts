import "./index.css";
import { detectLanguage, type Language } from "@pkgs/core";

const codeInput = document.getElementById("code-input") as HTMLTextAreaElement;
const resultContainer = document.getElementById("result-container") as HTMLElement;
const charCount = document.getElementById("char-count") as HTMLElement;

let timeout: number | null = null;

codeInput.oninput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  const query = target.value;

  // Update character count
  charCount.textContent = `${query.length} characters`;

  // Clear previous timeout for debouncing
  if (timeout) clearTimeout(timeout);

  // Debounce to avoid excessive detection calls
  timeout = setTimeout(() => handleDetection(query), 300);
};

function handleDetection(query: string) {
  if (!query.trim()) {
    renderEmptyState();
    return;
  }

  const result = detectLanguage(query);

  if (!result) renderNoResult();
  else renderResult(result);
}

function renderEmptyState() {
  resultContainer.innerHTML = `
    <div class="blankslate">
      <p>Waiting for code input to detect language...</p>
    </div>
  `;
}

function renderNoResult() {
  resultContainer.innerHTML = `
    <div class="blankslate">
      <p>Could not detect any specific language. Try adding more code.</p>
    </div>
  `;
}

function renderResult(result: Language) {
  // Clear previous
  resultContainer.innerHTML = "";

  const resultContent = document.createElement("div");
  resultContent.className = "result-content";

  const label = document.createElement("div");
  label.className = "language-tag";

  const dot = document.createElement("span");
  dot.className = "language-dot";

  const name = document.createElement("span");
  name.textContent = result.name;

  label.appendChild(dot);
  label.appendChild(name);
  resultContent.appendChild(label);

  // Add full debug details in a code block
  const details = document.createElement("pre");
  details.className = "result-details";
  details.textContent = JSON.stringify(result, null, 2);
  resultContent.appendChild(details);

  resultContainer.appendChild(resultContent);
}
