# Kstudy.academy

UAE campus studio for HCT exam prep (MGT 1003 and Foundations of AI) plus a teacher shop with a 2% fee.

Students enter a campus with a reusable access key. Teachers publish a course; it stays on hold until academy review.

## Render deploy

1. Push this repo to GitHub.
2. On [Render](https://render.com), **New → Web Service** → connect the repo.
3. Add a **PostgreSQL** database in the same Render account, then copy its **External Database URL** into `DATABASE_URL`.
4. Use these settings:

| Setting | Value |
| --- | --- |
| Runtime | Node |
| Node version | 22 |
| Build command | `npm ci && NITRO_PRESET=node-server npm run build` |
| Start command | `node .output/server/index.mjs` |

Environment variables:

```
NODE_VERSION=22
NITRO_PRESET=node-server
HOST=0.0.0.0
NITRO_HOST=0.0.0.0
DATABASE_URL=<Render Postgres external URL>
STAFF_USERNAME=admin
STAFF_PASSWORD=<set in the Render dashboard>
```

`npm run build` also runs SQL migrations. The start command serves the Nitro Node build on Render’s `PORT`.

Owner desk: the public shop does not show a staff link. Sign in at `/staff`. Set `STAFF_PASSWORD` in Render — do not commit it. Mint campus keys from the desk. New teacher listings stay on hold.

Or apply `render.yaml` with **New → Blueprint**.

## Local

```
npm ci
npm run dev
```

The studio listens on port 8080.
