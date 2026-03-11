import { languages, type Language } from "@pkgs/languages";

/**
 * Get the language of the input string.
 *
 * @param input The input string to analyze.
 * @returns The detected language, or null if no language is detected.
 */
export function getLanguage(input: string): Language | null {
  return languages.find((lang) => lang.aliases?.includes(input)) || null;
}
