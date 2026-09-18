import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { meta } from "@/content/home";
import Home from "@/components/home/Home";
import PageRail, { type RailItem } from "@/components/site/PageRail";

/**
 * The home page. Its words - the title, the description and all twelve bands - come from
 * content/home.ts (D87); the bands themselves are components/home/*.
 *
 * The title is ABSOLUTE: Home is the one page whose <title> is the site's own name, so the layout's
 * "%s · SOP · SACS-IT" template would say it twice. These are the mock's own words.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: { absolute: meta.title },
    description: meta.description,
    alternates: { canonical: "/" },
    openGraph: { title: meta.title, description: meta.description, url: "/" },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  // Home is 31 000 pixels tall, so it gets the same rail as the inner pages - its own bands, by the
  // anchors they already carry (the five capability blocks, the partner panel, the documents, the desk).
  // No Home chip here: you are on it.
  const rail: RailItem[] = [
    { id: "capabilities", title: "Five capabilities" },
    { id: "cap-scada", n: "01", title: "SCADA" },
    { id: "cap-ems", n: "02", title: "Execution Manufacturing System" },
    { id: "cap-eps", n: "03", title: "Equipment Performance System" },
    { id: "cap-cmms", n: "04", title: "Maintenance" },
    { id: "cap-rep", n: "05", title: "Enterprise Reporting" },
    { id: "partners", title: "Partners" },
    { id: "material", title: "The documents" },
    { id: "write", title: "Write to us" },
  ];

  return (
    <>
      <PageRail items={rail} home={false} />
      <Home />
    </>
  );
}
