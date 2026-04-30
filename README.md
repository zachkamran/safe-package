# safe-package-worker

Minimal Cloudflare Worker (TypeScript + Wrangler) with KV bindings for cache/metadata and optional R2 artifact persistence.

## One-click deploy

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/your-org/safe-package)

> Replace `https://github.com/your-org/safe-package` with your actual repository URL before sharing.

## Quickstart

### 1) Install dependencies

```bash
npm install
```

### 2) Create Cloudflare resources

```bash
npx wrangler kv namespace create CACHE_KV
npx wrangler kv namespace create METADATA_KV
npx wrangler r2 bucket create replace-with-artifacts-bucket
npx wrangler r2 bucket create replace-with-artifacts-bucket-preview
```

Copy the KV namespace IDs into `wrangler.toml`.

### 3) Authenticate Wrangler

```bash
npx wrangler login
```

### 4) Run locally

```bash
npm run dev
```

### 5) Deploy

```bash
npm run deploy
```

## Required bindings / environment

`wrangler.toml` requires these bindings:

- `CACHE_KV` (KV namespace, required)
- `METADATA_KV` (KV namespace, required)
- `ARTIFACTS_R2` (R2 bucket, optional for runtime usage but configured in `wrangler.toml`)

## Scripts

- `npm run dev` → starts local development server via Wrangler
- `npm run deploy` → deploys Worker
- `npm run check` → TypeScript type-check (`tsc --noEmit`)
