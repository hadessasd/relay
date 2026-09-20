# Kstudy.academy

UAE campus studio for HCT exam prep (MGT 1003 and Foundations of AI) plus a teacher shop with a 2% fee.

Students enter a campus with a reusable access key. Teachers publish a course; it stays on hold until academy review.

## GitHub layout (this is what broke Render)

After you unzip, **`package.json` and `server.js` must sit at the GitHub repo root.**

Do **not**:

- Upload `kstudy-academy.zip` itself to GitHub (Render will not unzip it)
- Commit an extra wrapping folder so the repo looks like `kstudy-academy/package.json`

Do:

1. Unzip.
2. Open the folder that **directly** contains `package.json` and `server.js`.
3. `git init` **inside that folder**, push, connect Render.

If GitHub’s file list starts with a nested `kstudy-academy/` directory, Render runs `node server.js` at the parent and crashes with `Cannot find module '.../src/server.js'`.

## Render deploy

Render’s checkout path is `/opt/render/project/src`. The start command `node server.js` means that exact file must exist there.

1. Push the unzipped folder to GitHub as above.
2. On [Render](https://render.com), **New → Web Service** → connect the repo.
3. Add a **PostgreSQL** database, then paste its **External Database URL** into `DATABASE_URL`.
4. Settings → Build & Deploy:

| Setting | Value |
| --- | --- |
| Runtime | Node |
| Node version | 22 |
| Build command | `bash render-build.sh` |
| Start command | `node server.js` |

Environment variables:

```
NODE_VERSION=22
NITRO_PRESET=node-server
NPM_CONFIG_PRODUCTION=false
HOST=0.0.0.0
NITRO_HOST=0.0.0.0
DATABASE_URL=<Render Postgres external URL>
STAFF_USERNAME=admin
STAFF_PASSWORD=<set in the Render dashboard>
```

Then **Manual Deploy → Clear build cache & deploy**.

The log `Cannot find module '/opt/render/project/src/server.js'` on Node v26 means the GitHub root is still missing `server.js` (nested folder or unextracted zip) and Node is not pinned. Fix the repo layout, keep `.node-version` / `.nvmrc` at the root (both say `22`), and redeploy.

`server.js` will also run the production build on first boot if `.output/` is missing, so a leftover `npm install` build command can still come up. Prefer `bash render-build.sh`.

Owner desk: the public shop does not show a staff link. Sign in at `/staff`. Set `STAFF_PASSWORD` in Render — do not commit it.

Or apply `render.yaml` with **New → Blueprint**.

## Local

```
npm ci
npm run dev
```
