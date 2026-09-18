import Link from "next/link";
import { getTranslations } from "next-intl/server";

/** A wrong URL: say so in the site's own voice and put the whole site one click away. */
export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="band navy on-navy">
      <div className="wrap">
        <div className="measure">
          <p className="kicker">{t("kicker")}</p>
          <h2>{t("title")}</h2>
          <p className="lead">{t("lede")}</p>
          <Link className="cta" href="/">
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
