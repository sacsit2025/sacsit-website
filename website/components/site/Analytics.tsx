import Script from "next/script";

/**
 * Cloudflare Web Analytics (D20): no cookie, nothing stored on the device, so no consent banner.
 *
 * It loads only when the token is set, so a local run and a preview are silent; DevOps pastes
 * CLOUDFLARE_ANALYTICS_TOKEN (NEXT_PUBLIC_, because the beacon reads it in the browser) when the
 * domain moves. The disclosure sentence is in the footer, since D85 removed the privacy page.
 */
export default function Analytics() {
  const token = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN;
  if (!token) return null;
  return (
    <Script
      id="cf-analytics"
      strategy="afterInteractive"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
