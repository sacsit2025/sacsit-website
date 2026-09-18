import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import Analytics from "@/components/site/Analytics";
import Chrome from "@/components/site/Chrome";
import "../globals.css";

/**
 * The root layout. It sits under [locale] on purpose: the locale is then a route PARAMETER, so every
 * page can be prerendered (next-intl's static-rendering shape, D18). A layout above this one would
 * have to ask for the locale at request time and would make the whole site dynamic.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#14202F",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  setRequestLocale(locale);
  const t = await getTranslations("site");
  return {
    title: {
      default: "SOP · SCADA Open Platform · SACS-IT",
      template: `%s · ${t("titleSuffix")}`,
    },
    description:
      "SOP, the SCADA Open Platform: SCADA, Execution Manufacturing System, Equipment Performance System, maintenance and Enterprise Reporting, born on one database. A platform by SACS-IT.",
    applicationName: "SOP",
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sacsit.com"),
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: "/apple-touch-icon.png",
    },
    openGraph: { type: "website", siteName: "SOP · SACS-IT", locale },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("site");

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>
          <a className="skip" href="#main">
            {t("skip")}
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <Chrome />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
