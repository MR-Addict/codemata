import fs from "node:fs";

/**
 * Recursively creates a directory if it does not already exist.
 *
 * @param dirPath The path of the directory to create.
 */
export function mkdir(dirPath: string) {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
}
