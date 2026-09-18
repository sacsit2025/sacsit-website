import type { MetadataRoute } from "next";

const base = () => (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sacsit.com").replace(/\/$/, "");

/**
 * The site is public, the routes behind the forms are not for crawlers, and a PREVIEW deployment must
 * not be indexed at all (D88: the previous site stays up until the domain is moved deliberately - a preview that
 * gets indexed would compete with it). Vercel sets VERCEL_ENV=preview on every preview build.
 */
export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV === "preview" || process.env.SITE_NOINDEX === "1";
  if (isPreview) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: base() + "/sitemap.xml",
    host: base(),
  };
}
