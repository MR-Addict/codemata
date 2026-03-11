/**
 * Type representing a programming language with the relevant fields for detection and display.
 */
export type Language = {
  name: string;
  type: "data" | "programming" | "markup" | "prose";
  color?: string;
  extensions?: string[];
  filenames?: string[];
  aliases?: string[];
  interpreters?: string[];
};
