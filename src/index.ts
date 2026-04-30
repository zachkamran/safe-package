export interface Env {
  CACHE_KV: KVNamespace;
  METADATA_KV: KVNamespace;
  ARTIFACTS_R2?: R2Bucket;
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({ ok: true, service: "safe-package-worker" });
    }

    const now = new Date().toISOString();
    await env.METADATA_KV.put("last_request_at", now);

    const cacheKey = `visit:${url.pathname}`;
    const current = await env.CACHE_KV.get(cacheKey);
    const visits = (current ? Number.parseInt(current, 10) : 0) + 1;
    await env.CACHE_KV.put(cacheKey, visits.toString());

    return Response.json({
      message: "Hello from Cloudflare Workers (TypeScript)!",
      path: url.pathname,
      visits,
      last_request_at: now,
      has_artifact_bucket: Boolean(env.ARTIFACTS_R2)
    });
  }
} satisfies ExportedHandler<Env>;
