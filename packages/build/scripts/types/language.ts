import { z } from "zod";

/**
 * Schema representing the raw language data as defined by GitHub Linguist.
 */
export const RawLanguageSchema = z.object({
  /**
   * The name of the language, which should be unique across all languages.
   *
   * This is the primary identifier for the language and is used in various contexts,
   * such as displaying the language name, matching against file extensions, and in
   * code searches by language.
   */
  name: z.string(),
  /**
   * Unique identifier used internally by GitHub.
   */
  language_id: z.number(),
  /**
   * The type of language, which can be one of the following:
   * - "data": A language primarily used for data representation (e.g., JSON, YAML).
   * - "programming": A language primarily used for programming (e.g., JavaScript, Python).
   * - "markup": A language primarily used for markup (e.g., HTML, XML).
   * - "prose": A language primarily used for prose (e.g., Markdown, reStructuredText).
   *
   * This field is used to categorize languages and may influence how they are processed or displayed.
   */
  type: z.enum(["data", "programming", "markup", "prose"]),
  /**
   * The TextMate scope that represents this programming language.
   *
   * This should match one of the scopes listed in grammars.yml.
   *
   * Use "none" if there is no TextMate grammar for this language.
   */
  tm_scope: z.string(),
  /**
   * Ace mode used when editing files which use the language. This must match
   * one of the names in https://gh.io/acemodes. Use "text" if no mode exists.
   */
  ace_mode: z.string(),
  /**
   * List of associated file extensions, sorted in ascending ASCII order,
   * except for the language's primary extension, which is always listed first.
   */
  extensions: z.array(z.string()).optional(),
  /**
   * List of associated filenames, sorted in ascending ASCII order.
   *
   * May be omitted if the extensions field is present (and vice versa).
   */
  filenames: z.array(z.string()).optional(),
  /**
   * List of additional aliases (implicitly includes lowercased forms of language's name).
   *
   * These are used in fenced code-blocks, code searches by language, and in overrides.
   */
  aliases: z.array(z.string()).optional(),
  /**
   * CodeMirror 5 mode used when editing files that use the language.
   *
   * This must match one of the names listed here: https://git.io/vi9Fx
   */
  codemirror_mode: z.string().optional(),
  /**
   * MIME media-type used by CodeMirror 5 for selecting a mode for editing the language.
   *
   * The `mime` types supported by the named mode are listed here: https://git.io/f4SoQ
   */
  codemirror_mime_type: z.string().optional(),
  /**
   * CSS colour code used to represent the language (format: "#RRGGBB").
   */
  color: z.string().optional(),
  /**
   * Filesystem name used when creating directories for the language. Only necessary for
   * languages whose names contain symbols that are invalid or unsafe on certain systems.
   */
  fs_name: z.string().optional(),
  /**
   * Name of the parent language. Languages in a group contribute to the usage statistics
   * of their parent language.
   */
  group: z.string().optional(),
  /**
   * List of programs that execute the language (by running and/or compiling it).
   *
   * These are consulted when scrutinising a file's hashbang to determine its language.
   */
  interpreters: z.array(z.string()).optional(),
  /**
   * Enable soft line-wrapping
   *
   * @default false
   */
  wrap: z.boolean().optional()
});

/**
 * Schema representing a programming language with the relevant fields for detection and display.
 */
export const LanguageSchema = RawLanguageSchema.pick({
  name: true,
  type: true,
  extensions: true,
  filenames: true,
  aliases: true,
  interpreters: true,
  color: true
});
