import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { FOOTER_LINKS } from "@/content/menu";

/**
 * The footer: only destinations that exist.
 *
 * D85 removed the Company/About page and the Privacy page, so neither is linked and the legal line no
 * longer promises a privacy statement. The analytics sentence D20 asked for (Cloudflare Web Analytics,
 * no cookie, nothing on the device) is printed here instead, because that disclosure lost its page -
 * kept on the open-points list.
 */
export default async function Footer() {
  const t = await getTranslations("footer");
  return (
    <footer>
      <div className="wrap">
        <div className="cols">
          {FOOTER_LINKS.map((l) =>
            l.href.startsWith("#") ? (
              <a key={l.label} href={l.href}>
                {l.label}
              </a>
            ) : (
              <Link key={l.label} href={l.href}>
                {l.label}
              </Link>
            ),
          )}
        </div>
        <div className="legal">
          {t("legal")} · {t("analytics")}
        </div>
      </div>
    </footer>
  );
}
