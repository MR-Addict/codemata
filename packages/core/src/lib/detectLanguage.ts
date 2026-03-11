import { languages } from "@pkgs/build";
import type { Language } from "@pkgs/build";

/**
 * Detects the programming language based on the input string.
 * The input can be a file path, file name, language name, or language alias.
 * It also supports matching by shebang/interpreter.
 *
 * @param input - The string to detect the language for (name, path, alias, interpreter)
 * @returns The best matching Language object or undefined if no match is found
 */
export function detectLanguage(input: string): Language | undefined {
  if (!input || typeof input !== "string") return undefined;

  const normalizedInput = input.trim();
  const lowerInput = normalizedInput.toLowerCase();

  // Try parsing as a file path to extract filename and extension
  // Using a simple regex to get the basename and extension to avoid depending on Node's 'path' in the browser
  const basenameMatch = normalizedInput.match(/[^\\/]+$/);
  const basename = basenameMatch ? basenameMatch[0] : normalizedInput;
  const lowerBasename = basename.toLowerCase();

  const extMatch = basename.match(/(\.[^.]+)$/);
  const extension = extMatch ? extMatch[1].toLowerCase() : "";

  // 1. Name Match (Highest priority)
  const byName = languages.find((lang) => lang.name.toLowerCase() === lowerInput);
  if (byName) return byName;

  // 2. Alias Match
  const byAlias = languages.find((lang) => lang.aliases?.some((alias) => alias.toLowerCase() === lowerInput));
  if (byAlias) return byAlias;

  // 3. Filename Match
  const byFilename = languages.find((lang) => lang.filenames?.some((name) => name.toLowerCase() === lowerBasename));
  if (byFilename) return byFilename;

  // 4. Extension Match
  if (extension) {
    const byExtension = languages.find((lang) => lang.extensions?.some((ext) => ext.toLowerCase() === extension));
    if (byExtension) return byExtension;
  }

  // 5. Interpreter/Shebang Match
  const byInterpreter = languages.find((lang) =>
    lang.interpreters?.some((interpreter) => interpreter.toLowerCase() === lowerInput)
  );
  if (byInterpreter) return byInterpreter;

  return undefined;
}
