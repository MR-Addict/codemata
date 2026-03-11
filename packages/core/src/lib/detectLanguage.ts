import { languages } from "@pkgs/build";
import type { Language } from "@pkgs/build";

const TYPE_PRIORITY: Record<string, number> = {
  programming: 4,
  markup: 3,
  data: 2,
  prose: 1
};

function sortByPriority(searchExtOrName: string) {
  return function (a: Language, b: Language): number {
    const priorityA = TYPE_PRIORITY[a.type];
    const priorityB = TYPE_PRIORITY[b.type];
    if (priorityA !== priorityB) return priorityB - priorityA;

    // Tie-breaker 1: Primary extension match
    const aPrimaryExt = a.extensions?.[0]?.toLowerCase();
    const bPrimaryExt = b.extensions?.[0]?.toLowerCase();
    const isAPrimary = aPrimaryExt === searchExtOrName;
    const isBPrimary = bPrimaryExt === searchExtOrName;
    if (isAPrimary && !isBPrimary) return -1;
    if (!isAPrimary && isBPrimary) return 1;

    // Tie-breaker 2: Name match to the search string without dot
    const cleanSearch = searchExtOrName.replace(/^\./, "").toLowerCase();
    const isAName = a.name.toLowerCase() === cleanSearch || a.aliases?.some((x) => x.toLowerCase() === cleanSearch);
    const isBName = b.name.toLowerCase() === cleanSearch || b.aliases?.some((x) => x.toLowerCase() === cleanSearch);
    if (isAName && !isBName) return -1;
    if (!isAName && isBName) return 1;

    return 0;
  };
}

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

  // Parse shebang explicitly (e.g. `#!/usr/bin/env node` or `#!/bin/bash`)
  let interpreterName = "";
  if (normalizedInput.startsWith("#!")) {
    const parts = normalizedInput.split(" ");
    const interpreterMatch = parts[0].match(/([^/]+)$/);
    if (parts.length > 1 && parts[0].endsWith("env")) {
      interpreterName = parts[1].toLowerCase();
    } else if (interpreterMatch) {
      interpreterName = interpreterMatch[1].toLowerCase();
    }
  }

  // Try parsing as a file path to extract filename and extension
  // Using a simple regex to get the basename and extension to avoid depending on Node's 'path' in the browser
  const basenameMatch = normalizedInput.match(/[^\\/]+$/);
  const basename = basenameMatch ? basenameMatch[0] : normalizedInput;
  const lowerBasename = basename.toLowerCase();

  // Support multiple extensions like `.blade.php`, `.d.ts` as well as `.ts`
  const extensions: string[] = [];
  let currentExtName = basename;
  while (true) {
    const extMatch = currentExtName.match(/(\.[^.]+)$/);
    if (!extMatch) break;
    const ext = extMatch[1].toLowerCase();

    // Map existing extensions by prefixing them with the new part
    const newExts = extensions.map((e) => ext + e);
    // Push the prefixed versions first (they are longer)
    extensions.unshift(...newExts);
    // Finally add the plain single extension as the shortest so far
    extensions.push(ext);

    currentExtName = currentExtName.slice(0, -ext.length);
  }
  // Remove duplicates and sort by length descending
  const uniqueExtensions = Array.from(new Set(extensions)).sort((a, b) => b.length - a.length);

  // 1. Name Match (Highest priority)
  const byName = languages.find((lang) => lang.name.toLowerCase() === lowerInput);
  if (byName) return byName;

  // 2. Alias Match
  const byAlias = languages.find((lang) => lang.aliases?.some((alias) => alias.toLowerCase() === lowerInput));
  if (byAlias) return byAlias;

  // 3. Filename Match
  const byFilenames = languages.filter((lang) => lang.filenames?.some((name) => name.toLowerCase() === lowerBasename));
  if (byFilenames.length > 0) return byFilenames.sort(sortByPriority(lowerBasename))[0];

  // 4. Extension Match
  // Check the longest extensions first (e.g. .d.ts before .ts)
  for (const ext of uniqueExtensions) {
    const matches = languages.filter((lang) => lang.extensions?.some((e) => e.toLowerCase() === ext));
    if (matches.length > 0) return matches.sort(sortByPriority(ext))[0];
  }

  // 5. Interpreter/Shebang Match
  const targetInterpreter = interpreterName || lowerInput;
  const byInterpreters = languages.filter((lang) =>
    lang.interpreters?.some((interpreter) => interpreter.toLowerCase() === targetInterpreter)
  );
  if (byInterpreters.length > 0) return byInterpreters.sort(sortByPriority(targetInterpreter))[0];

  return undefined;
}
