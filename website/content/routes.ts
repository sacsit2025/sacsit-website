/**
 * The site's pages: one row per page, the URL it lives at, and the spec that fills it.
 *
 * The URL is short and in plain words; the anchor ids inside a page come from its spec (`scada-trends`,
 * `partners-si-market`) and are never renamed here - the menu links to them and so does the site map.
 * D93: all twelve go live together, so this table is the whole site.
 */

export type NavGroup = "platform" | "why" | "capabilities" | "partners";

export interface Route {
  /** the spec in content/pages, without .spec.json ("03-scada") */
  slug: string;
  /** the URL path, no locale prefix and no leading slash ("scada", "partners/erp-vendors") */
  path: string;
  /** which menu entry is current */
  nav: NavGroup;
  /** the prefix every anchor id on that page carries ("scada" -> #scada-trends) */
  anchor: string;
  /** the short name in the menu and the site map */
  name: string;
}

export const ROUTES: Route[] = [
  { slug: "02-platform", path: "platform", nav: "platform", anchor: "platform", name: "Platform" },
  { slug: "03-scada", path: "scada", nav: "capabilities", anchor: "scada", name: "SCADA" },
  { slug: "04-ems", path: "ems", nav: "capabilities", anchor: "ems", name: "Execution Manufacturing System" },
  { slug: "05-eps", path: "eps", nav: "capabilities", anchor: "eps", name: "Equipment Performance System" },
  { slug: "06-maintenance", path: "maintenance", nav: "capabilities", anchor: "cmms", name: "Maintenance" },
  { slug: "07-reporting", path: "reporting", nav: "capabilities", anchor: "reporting", name: "Enterprise Reporting" },
  { slug: "08-why-sop", path: "why-sop", nav: "why", anchor: "why", name: "Why SOP" },
  {
    slug: "09-system-integrators",
    path: "partners/system-integrators",
    nav: "partners",
    anchor: "partners-si",
    name: "System Integrators",
  },
  {
    slug: "10-machine-builders",
    path: "partners/machine-builders",
    nav: "partners",
    anchor: "partners-oem",
    name: "Machine builders · OEM",
  },
  {
    slug: "11-erp-vendors",
    path: "partners/erp-vendors",
    nav: "partners",
    anchor: "partners-erp",
    name: "ERP vendors",
  },
  {
    slug: "12-ai-startups",
    path: "partners/ai-startups",
    nav: "partners",
    anchor: "partners-ai",
    name: "AI startups for industry",
  },
];

const BY_ANCHOR = new Map(ROUTES.map((r) => [r.anchor, r]));
const BY_PATH = new Map(ROUTES.map((r) => [r.path, r]));
const BY_SLUG = new Map(ROUTES.map((r) => [r.slug, r]));

export const routeByAnchor = (anchor: string) => BY_ANCHOR.get(anchor);
export const routeByPath = (path: string) => BY_PATH.get(path);
export const routeBySlug = (slug: string) => BY_SLUG.get(slug);

/** "/scada", or "/scada#scada-trends" when a section key is given. */
export function href(anchor: string, key?: string): string {
  const r = BY_ANCHOR.get(anchor);
  if (!r) throw new Error("no route for anchor: " + anchor);
  return "/" + r.path + (key ? `#${anchor}-${key}` : "");
}

/** Home, and the bands of Home the menu points at. */
export const HOME = "/";
export const homeHash = (hash: "capabilities" | "partners" | "material" | "write") => `/#${hash}`;
