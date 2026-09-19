import type { Metadata } from "next";
import "./globals.css";

/**
 * A URL that does not even carry a known locale (Next 16's global-not-found). The locale-aware 404 is
 * app/[locale]/not-found.tsx; this one has to bring its own <html> because it renders outside the
 * root layout.
 */
export const metadata: Metadata = {
  title: "Nothing here · SOP · SACS-IT",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body>
        <main id="main">
          <section className="band navy on-navy">
            <div className="wrap">
              <div className="measure">
                <p className="kicker">Nothing here</p>
                <h2>That page is not on this site.</h2>
                <p className="lead">
                  The platform, the five capabilities, the four partner channels are all one
                  click away.
                </p>
                <a className="cta" href="/">
                  Go to the home page
                </a>
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
