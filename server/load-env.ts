import fs from "fs";
import path from "path";

let envLoaded = false;
const loadedFromFiles = new Set<string>();

function parseLine(line: string): [string, string] | undefined {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) {
    return undefined;
  }

  const equalsIndex = trimmed.indexOf("=");
  if (equalsIndex === -1) {
    return undefined;
  }

  const key = trimmed.slice(0, equalsIndex).trim();
  let value = trimmed.slice(equalsIndex + 1).trim();

  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1);
  }

  value = value.replace(/\\n/g, "\n");

  return [key, value];
}

function applyEnvFromFile(filepath: string) {
  if (!fs.existsSync(filepath)) {
    return;
  }

  const contents = fs.readFileSync(filepath, "utf8");
  for (const line of contents.split(/\r?\n/)) {
    const parsed = parseLine(line);
    if (!parsed) continue;

    const [key, value] = parsed;

    if (process.env[key] !== undefined && !loadedFromFiles.has(key)) {
      continue;
    }

    process.env[key] = value;
    loadedFromFiles.add(key);
  }
}

export function loadEnv() {
  if (envLoaded) {
    return;
  }

  envLoaded = true;

  const cwd = process.cwd();
  const nodeEnv = process.env.NODE_ENV?.trim() || "development";
  const candidates = [
    ".env",
    `.env.${nodeEnv}`,
    ".env.local",
    `.env.${nodeEnv}.local`,
  ];

  for (const candidate of candidates) {
    applyEnvFromFile(path.resolve(cwd, candidate));
  }
}

loadEnv();
