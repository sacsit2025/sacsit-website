import type { PageSpec } from "./spec";

/**
 * The eleven page specs, imported (not read from disk) so they are bundled with the build: nothing to
 * trace, nothing to ship beside the server, and a missing spec is a build error rather than a 500.
 * D87: these files are the site's content.
 */
const SPECS: Record<string, () => Promise<{ default: unknown }>> = {
  "02-platform": () => import("@/content/pages/02-platform.spec.json"),
  "03-scada": () => import("@/content/pages/03-scada.spec.json"),
  "04-ems": () => import("@/content/pages/04-ems.spec.json"),
  "05-eps": () => import("@/content/pages/05-eps.spec.json"),
  "06-maintenance": () => import("@/content/pages/06-maintenance.spec.json"),
  "07-reporting": () => import("@/content/pages/07-reporting.spec.json"),
  "08-why-sop": () => import("@/content/pages/08-why-sop.spec.json"),
  "09-system-integrators": () => import("@/content/pages/09-system-integrators.spec.json"),
  "10-machine-builders": () => import("@/content/pages/10-machine-builders.spec.json"),
  "11-erp-vendors": () => import("@/content/pages/11-erp-vendors.spec.json"),
  "12-ai-startups": () => import("@/content/pages/12-ai-startups.spec.json"),
};

export async function loadSpec(slug: string): Promise<PageSpec> {
  const load = SPECS[slug];
  if (!load) throw new Error(`no spec for page "${slug}" - see content/pages/`);
  const mod = await load();
  return mod.default as PageSpec;
}

export const SPEC_SLUGS = Object.keys(SPECS);
