import { Sample } from "./detectLanguage.test";

export const samples: Sample[] = [
  { description: "Empty string", input: "", expected: undefined },
  { description: "Whitespace only", input: "   ", expected: undefined },
  { description: "Exact name", input: "TypeScript", expected: "TypeScript" },
  { description: "Case-insensitive name", input: "javascript", expected: "JavaScript" },
  { description: "Alias match", input: "js", expected: "JavaScript" },
  { description: "Filename match", input: "Dockerfile", expected: "Dockerfile" },
  { description: "Filename with absolute path", input: "/usr/src/app/Dockerfile", expected: "Dockerfile" },
  { description: "Extension match", input: "index.html", expected: "HTML" },
  { description: "Extension match with relative path", input: "src/utils/index.ts", expected: "TypeScript" },
  { description: "Extension case-insensitive", input: "App.TSX", expected: "TSX" },
  { description: "Interpreter match", input: "bash", expected: "Shell" },
  { description: "Interpreter match case-insensitive", input: "PYTHON", expected: "Python" },
  { description: "Multi-dot extension (e.g., .d.ts)", input: "types.d.ts", expected: "TypeScript" },
  {
    description: "Multi-dot extension fallback (e.g., .unknown.ts -> .ts)",
    input: "file.unknown.ts",
    expected: "TypeScript"
  },
  { description: "Full shebang line (env node)", input: "#!/usr/bin/env node", expected: "JavaScript" },
  { description: "Full shebang line (direct bin)", input: "#!/bin/bash", expected: "Shell" },
  { description: "Full shebang line (python)", input: "#!/usr/bin/python3", expected: "Python" },
  { description: "Unknown file extension", input: "foo.randomext123", expected: undefined },
  { description: "Dotfile with extension", input: ".eslintrc.json", expected: "JSON with Comments" },
  { description: "Exact filename C++", input: "main.cpp", expected: "C++" },
  { description: "Language with special characters", input: "C#", expected: "C#" },
  { description: "React JSX", input: "Component.jsx", expected: "JavaScript" },
  { description: "React TSX", input: "Component.tsx", expected: "TSX" },
  { description: "Data formats (YAML)", input: "docker-compose.yml", expected: "YAML" },
  { description: "Data formats (JSON)", input: "package.json", expected: "JSON" },
  { description: "Mixed case extensions", input: "script.Py", expected: "Python" },
  {
    description: "File path containing dot but no strict extension",
    input: "my.folder/Makefile",
    expected: "Makefile"
  },
  { description: "Multi-dot extension (e.g., .blade.php)", input: "view.blade.php", expected: "Blade" },
  {
    description: "Multi-dot extension (e.g., .tar.gz should be undefined/fallback)",
    input: "archive.tar.gz",
    expected: undefined
  },
  { description: "Shebang with trailing spaces", input: "#!/bin/sh   ", expected: "Shell" },
  { description: "Just a dot", input: ".", expected: undefined }
];
