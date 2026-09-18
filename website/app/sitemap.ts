import type { MetadataRoute } from "next";
import { ROUTES } from "@/content/routes";

const base = () => (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sacsit.com").replace(/\/$/, "");

/** Home plus the eleven pages (D93: the whole site at once). One locale today, D18's shape for more. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: base() + "/", lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...ROUTES.map((r) => ({
      url: `${base()}/${r.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: r.nav === "partners" ? 0.7 : 0.8,
    })),
  ];
}
