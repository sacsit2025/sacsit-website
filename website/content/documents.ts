/**
 * The eight documents of Home's information shelf (band 11) - as data, so the shelf, the gate and the
 * download route all read the same row.
 *
 * The titles, the "pdf · N pages" line and the two cover lines are VERBATIM from the approved mock
 * (mock-home/_build/home3.template.html, band 11 "INFORMATION MATERIAL"). Nothing here is a new claim.
 *
 * D89: the button is form-gated - name + e-mail + which document, then the link. The PDF itself is NOT
 * in the repo and never in public/: DevOps drops the file into `documents/` at the repo root under the
 * `file` name below (documents/README.md is the drop list). D89 also holds the gate closed until the
 * eight PDFs have had their claims pass, so an absent file is the NORMAL state today: the route answers
 * `{ok:false, reason:"missing"}` and the button prints `documents.missing`.
 */

export interface SiteDocument {
  /** the id the gate posts and the shelf mounts ("scada") - stable, lower case, never renamed */
  id: string;
  /** the shelf's <h4>, verbatim from the mock */
  title: string;
  /** the file DevOps drops into documents/ - the only name the download route will open */
  file: string;
  /** the shelf's .meta line, verbatim from the mock */
  pages: string;
  /** the two lines printed on the drawn cover, verbatim from the mock */
  cover: readonly [string, string];
}

export const DOCUMENTS: readonly SiteDocument[] = [
  {
    id: "platform",
    title: "SOP — the platform",
    file: "SOP-Platform-EN.pdf",
    pages: "pdf · 14 pages",
    cover: ["SOP", "THE PLATFORM"],
  },
  {
    id: "scada",
    title: "SCADA Core",
    file: "SOP-SCADA-Core-EN.pdf",
    pages: "pdf · 18 pages",
    cover: ["SCADA", "CORE"],
  },
  {
    id: "ems",
    title: "EMS · Execution Manufacturing System",
    file: "SOP-EMS-Module-EN.pdf",
    pages: "pdf · 16 pages",
    cover: ["EMS", "MODULE"],
  },
  {
    id: "eps",
    title: "EPS · Equipment Performance System",
    file: "SOP-EPS-Module-EN.pdf",
    pages: "pdf · 14 pages",
    cover: ["EPS", "MODULE"],
  },
  {
    id: "cmms",
    title: "CMMS · Maintenance",
    file: "SOP-CMMS-Module-EN.pdf",
    pages: "pdf · 14 pages",
    cover: ["CMMS", "MODULE"],
  },
  {
    id: "reporting",
    title: "Enterprise Reporting",
    file: "SOP-Reporting-Module-EN.pdf",
    pages: "pdf · 14 pages",
    cover: ["REPORTS", "MODULE"],
  },
  {
    id: "integrators",
    title: "Integrators Edition",
    file: "SOP-Integrators-Edition-EN.pdf",
    pages: "pdf · 18 pages",
    cover: ["INTEGRATORS", "EDITION"],
  },
  {
    id: "oem",
    title: "OEM Edition",
    file: "SOP-OEM-Edition-EN.pdf",
    pages: "pdf · 20 pages",
    cover: ["OEM", "EDITION"],
  },
];

const BY_ID = new Map(DOCUMENTS.map((d) => [d.id, d]));

/** The row for an id, or undefined - the download routes refuse anything they cannot find here. */
export const documentById = (id: string): SiteDocument | undefined => BY_ID.get(id);

export const DOCUMENT_IDS: readonly string[] = DOCUMENTS.map((d) => d.id);
