import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ROUTES, routeByPath } from "@/content/routes";
import { routing } from "@/i18n/routing";
import { loadSpec } from "@/lib/content";
import { plain } from "@/lib/rich";
import Hero from "@/components/sections/Hero";
import Sections from "@/components/sections/Sections";
import PageRail, { type RailItem } from "@/components/site/PageRail";

/** The eleven inner pages, all of them static (D93: the whole site goes live at once). */
export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    ROUTES.map((r) => ({ locale, path: r.path.split("/") })),
  );
}

async function routeOf(params: Promise<{ locale: string; path: string[] }>) {
  const { locale, path } = await params;
  const route = routeByPath(path.join("/"));
  return { locale, route };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; path: string[] }>;
}): Promise<Metadata> {
  const { route } = await routeOf(params);
  if (!route) return {};
  const spec = await loadSpec(route.slug);
  const title = plain(spec.hero.h1) || route.name;
  const description = plain(spec.hero.dek) || plain(spec.hero.kicker);
  return {
    title,
    description,
    alternates: { canonical: "/" + route.path },
    openGraph: { title, description, url: "/" + route.path },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; path: string[] }>;
}) {
  const { locale, route } = await routeOf(params);
  if (!route) notFound();
  setRequestLocale(locale);
  const spec = await loadSpec(route.slug);

  // "On this page": the page's own chapters, in their order, straight out of the spec - a capability
  // page is ten of them and up to 39 000 pixels tall, so the rail is how you move inside it.
  const rail: RailItem[] = spec.sections
    .filter((s): s is Extract<typeof s, { type: "head" }> => s.type === "head" && Boolean(s.id))
    .map((s) => ({ id: s.id as string, n: s.n, title: plain(s.title) }));

  return (
    <>
      <Hero hero={spec.hero} group={route.nav} />
      <PageRail items={rail} page={spec.hero.kicker || spec.title} />
      <Sections sections={spec.sections} />
    </>
  );
}
