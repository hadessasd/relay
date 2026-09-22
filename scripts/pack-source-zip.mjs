#!/usr/bin/env node
/**
 * Pack the academy source so GitHub / Render see package.json and server.js
 * at the archive root — never nested under kstudy-academy/.
 */
import { copyFileSync, readdirSync, statSync } from "node:fs";
import { mkdir, rm } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const artifactsDir = join(root, "artifacts");
const outFile = join(artifactsDir, "kstudy-academy.zip");
const publicFile = join(root, "public", "kstudy-academy.zip");

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".output",
  ".nitro",
  ".tanstack",
  ".vercel",
  ".grok",
  "artifacts",
  "screenshots",
  "dist",
  "coverage",
]);

const SKIP_FILES = new Set([
  "AGENTS.md",
  "AGENTS.project.md",
  ".node_modules.lock",
  ".project_id",
]);

function skip(relPath) {
  const parts = relPath.split(sep);
  if (parts.some((p) => SKIP_DIRS.has(p))) return true;
  const base = parts[parts.length - 1] ?? "";
  if (SKIP_FILES.has(base)) return true;
  if (base.endsWith(".log")) return true;
  if (base === "kstudy-academy.zip") return true;
  if (base.startsWith(".env")) return true;
  if (base === ".DS_Store") return true;
  return false;
}

function listFiles(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    const rel = relative(root, abs);
    if (skip(rel)) continue;
    if (statSync(abs).isDirectory()) listFiles(abs, acc);
    else acc.push(rel.split(sep).join("/"));
  }
  return acc;
}

const files = listFiles(root).sort();
if (!files.includes("server.js") || !files.includes("package.json")) {
  console.error("[pack] server.js and package.json must be at the repo root");
  process.exit(1);
}

await mkdir(artifactsDir, { recursive: true });
await rm(outFile, { force: true });

const py = `
import json, zipfile, os, sys
root = sys.argv[1]
out = sys.argv[2]
files = json.loads(sys.stdin.read())
with zipfile.ZipFile(out, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=6) as z:
    for rel in files:
        z.write(os.path.join(root, rel), arcname=rel)
`;

execFileSync("python3", ["-c", py, root, outFile], {
  input: JSON.stringify(files),
  stdio: ["pipe", "inherit", "inherit"],
});

copyFileSync(outFile, publicFile);

const names = execFileSync("unzip", ["-Z", "-1", outFile], { encoding: "utf8" })
  .trim()
  .split("\n");
if (names.some((n) => n.startsWith("kstudy-academy/"))) {
  console.error("[pack] zip is nested under kstudy-academy/ — aborting");
  process.exit(1);
}
if (!names.includes("server.js") || !names.includes("package.json")) {
  console.error("[pack] zip root is missing server.js or package.json");
  process.exit(1);
}
console.log(`[pack] ${names.length} files → ${outFile}`);
console.log("[pack] root has server.js + package.json (flat, Render-ready)");
