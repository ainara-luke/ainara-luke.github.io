import type { APIRoute } from "astro";
import { SITE } from "@config";

const robots = `
User-agent: *
Disallow: /

User-agent: Googlebot
Disallow: /

User-agent: Bingbot
Disallow: /

User-agent: DuckDuckBot
Disallow: /

# No need for sitemap since we're blocking all access
`.trim();

export const GET: APIRoute = () =>
  new Response(robots, {
    headers: { "Content-Type": "text/plain" },
  });
