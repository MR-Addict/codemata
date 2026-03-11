import { describe, expect, it } from "vitest";

import { detectLanguage } from "../src";
import { samples } from "./detectLanguage.samples";

export type Sample = {
  description: string;
  input: string;
  expected?: string;
};

describe("detectLanguage", () => {
  it.each(samples)("$description", ({ input, expected }) => {
    const result = detectLanguage(input);
    if (expected === undefined) expect(result).toBeUndefined();
    else expect(result?.name).toBe(expected);
  });
});
