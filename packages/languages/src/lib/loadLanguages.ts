import fs from "fs";
import path from "path";
import YAML from "yaml";
import { z } from "zod";

import { writeFile } from "../utils/writeFile.js";
import { RawLanguageSchema, LanguageSchema } from "../types/language.js";

const languagesUrl = "https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml";

/**
 * Loads programming language data from the GitHub Linguist repository.
 *
 * @returns An array of Language objects.
 */
export async function loadLanguages() {
  const cacheDir = path.resolve(".cache");
  const cacheFile = path.join(cacheDir, "languages.yml");

  if (!fs.existsSync(cacheFile)) {
    const response = await fetch(languagesUrl);
    if (!response.ok) throw new Error(`Failed to fetch languages.yml: ${response.statusText}`);
    const text = await response.text();
    writeFile(cacheFile, text);
  }

  const fileContent = fs.readFileSync(cacheFile, "utf-8");
  const data = YAML.parse(fileContent);

  const rawLanguages: unknown[] = [];

  for (const [name, props] of Object.entries(data)) {
    rawLanguages.push({ name, ...(props as object) });
  }

  const validatedRawLanguages = z.array(RawLanguageSchema).parse(rawLanguages);
  const validatedLanguages = z.array(LanguageSchema).parse(validatedRawLanguages);

  return { data: validatedLanguages, raw: validatedRawLanguages };
}
