#!/usr/bin/env node
/**
 * Render / `npm start` entry.
 *
 * Render checks out the repo at /opt/render/project/src and runs `node server.js`.
 * This file MUST live at the GitHub repo root (same folder as package.json).
 * It loads Nitro's Node build at .output/server/index.mjs, and builds that
 * output on first boot if the Render build command was left as `npm install`.
 */
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

function isAppRoot(dir) {
  return (
    existsSync(resolve(dir, "package.json")) &&
    (existsSync(resolve(dir, "vite.config.ts")) ||
      existsSync(resolve(dir, ".output/server/index.mjs")))
  );
}

function resolveRoot() {
  const here = dirname(fileURLToPath(import.meta.url));
  const cwd = process.cwd();
  for (const dir of [here, cwd]) {
    if (isAppRoot(dir)) return dir;
    try {
      for (const ent of readdirSync(dir, { withFileTypes: true })) {
        if (!ent.isDirectory() || ent.name.startsWith(".")) continue;
        const child = resolve(dir, ent.name);
        if (isAppRoot(child)) return child;
      }
    } catch {
      // unreadable directory
    }
  }
  return here;
}

const root = resolveRoot();
if (process.cwd() !== root) process.chdir(root);

process.env.NITRO_PRESET ||= "node-server";
process.env.HOST ||= "0.0.0.0";
process.env.NITRO_HOST ||= "0.0.0.0";
process.env.NITRO_PORT ||= process.env.PORT || "10000";

const entry = resolve(root, ".output/server/index.mjs");

if (!existsSync(entry)) {
  console.log("[kstudy] No .output yet — building Nitro node-server from", root);
  const built = spawnSync("npm", ["run", "build"], {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      NITRO_PRESET: "node-server",
      NPM_CONFIG_PRODUCTION: "false",
    },
  });
  if (built.status !== 0) {
    console.error("[kstudy] Build failed. In the Render dashboard set:");
    console.error("  Build command:  bash render-build.sh");
    console.error("  Start command:  node server.js");
    console.error("  NODE_VERSION:   22");
    console.error("package.json and server.js must sit at the GitHub repo root — not inside a nested folder, and not as an unextracted zip.");
    process.exit(built.status ?? 1);
  }
}

if (!existsSync(entry)) {
  console.error("[kstudy] Missing", entry);
  process.exit(1);
}

console.log("[kstudy] starting", entry, "node", process.version, "port", process.env.PORT || process.env.NITRO_PORT);
await import(pathToFileURL(entry).href);
