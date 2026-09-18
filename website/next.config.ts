import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // this repo lives inside the SOP cockpit today and detaches later: trace from HERE, never from a
  // parent folder's lock file (Next warns about C:/Apps/sop/package-lock.json otherwise).
  outputFileTracingRoot: import.meta.dirname,
  // `next dev` writes a "This is NOT the Next.js you know" block into the repo's CLAUDE.md and re-adds
  // it on every run. That file is this project's own instruction file, read first by every
  // session: a tool does not get to edit it. Opt out (Next reads `agentRules !== false`).
  agentRules: false,
  // Every image is our own file under public/assets (scripts/sync-assets.mjs): no remote patterns,
  // no third-party host, nothing to allow-list. AVIF first, then WebP (D17: Vercel Pro, fra1).
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1200, 1440, 1920],
  },
  // The site loads nothing from anywhere else: fonts, images and scripts are ours. The one exception is
  // Cloudflare's Turnstile widget (D19) and Cloudflare Web Analytics (D20), both named here explicitly.
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://static.cloudflareinsights.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self' https://cloudflareinsights.com",
      "frame-src https://challenges.cloudflare.com",
      "form-action 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
    ].join("; ");
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default withNextIntl(config);
