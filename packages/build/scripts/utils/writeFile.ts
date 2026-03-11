import fs from "node:fs";
import path from "node:path";

/**
 * Writes content to a file, creating any necessary directories along the path.
 *
 * @param filePath The path of the file to write to.
 * @param content The content to write to the file.
 */
export function writeFile(filePath: string, content: string) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, content);
}
