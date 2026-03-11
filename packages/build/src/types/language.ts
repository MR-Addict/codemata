/**
 * Type representing a programming language with the relevant fields for detection and display.
 */
export type Language = {
  name: string;
  color?: string;
  extensions?: string[];
  filenames?: string[];
  aliases?: string[];
  interpreters?: string[];
};
