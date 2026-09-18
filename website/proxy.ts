import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next 16 renamed the "middleware" file convention to "proxy" - same function, same signature.
 * It is here for one reason: next-intl's locale negotiation (D18), so English stays at /platform while
 * a future locale gets /fr/platform without a change of route shape.
 *
 * The matcher writes "a dot" as [.] on purpose: in a TypeScript string a lone backslash-dot is not an
 * escape, so "\." silently becomes "." and the pattern then excludes every path of two characters or
 * more - which 404s the whole site while the home page alone answers. Paid for on 2026-09-18.
 */
export default createMiddleware(routing);

export const config = {
  // everything but the API routes, the Next internals, and any request for a file (it has a dot)
  matcher: ["/((?!api|_next|_vercel|.*[.].*).*)"],
};
