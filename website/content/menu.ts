/**
 * The menu - ONE definition, ported from the mocks' `_build/build-menu-mock.py` (locked by D77, label
 * for page 09 changed by D97). Order, names, promises and section entries are the owner's, verbatim.
 *
 * Header: Platform · Why SOP ▾ · Capabilities ▾ · Partners ▾ · Write to us.
 * Each dropdown column = a page, its promise, and its own sections as the spec ids name them.
 */
import { href, homeHash, HOME } from "./routes";

export interface MenuEntry {
  label: string;
  /** the section key; the link becomes /<page>#<anchor>-<key> */
  key: string;
}

export interface MenuColumn {
  name: string;
  /** the page's anchor prefix, which also identifies its route */
  anchor: string;
  promise: string;
  /** the words on the link to the whole page */
  all: string;
  entries: MenuEntry[];
}

export const CAPABILITIES: MenuColumn[] = [
  {
    name: "SCADA",
    anchor: "scada",
    promise: "One page, every screen it is opened on.",
    all: "The whole capability",
    entries: [
      { label: "Synoptics, every screen", key: "synoptics" },
      { label: "Machines and their documents", key: "machines" },
      { label: "Alarms", key: "alarms" },
      { label: "Trends", key: "trends" },
      { label: "Historian", key: "historian" },
      { label: "The editor, live", key: "editor" },
      { label: "TimeLens · replay", key: "timelens" },
      { label: "Tag Lens", key: "taglens" },
      { label: "Emergency HMI", key: "emergency-hmi" },
      { label: "Rights and the record", key: "rights" },
    ],
  },
  {
    name: "Execution Manufacturing System",
    anchor: "ems",
    promise: "The line runs its own orders.",
    all: "The whole capability",
    entries: [
      { label: "The plant model", key: "plant-model" },
      { label: "Products, recipes, the quality door", key: "recipes" },
      { label: "Orders, the calendar, the job", key: "orders" },
      { label: "Batches and the boundary", key: "batches" },
      { label: "The batch record", key: "batch-record" },
      { label: "The jobs board and the phone", key: "jobs-board" },
      { label: "The certificate, from the engine", key: "reports" },
    ],
  },
  {
    name: "Equipment Performance System",
    anchor: "eps",
    promise: "Lost hours stop being an opinion.",
    all: "The whole capability",
    entries: [
      { label: "One calculation, every screen", key: "one-calculation" },
      { label: "Stops and the reason", key: "stops" },
      { label: "The backlog", key: "backlog" },
      { label: "Two OEEs, any window", key: "oee" },
      { label: "Quality, first pass", key: "quality" },
      { label: "Where the time went", key: "bands" },
      { label: "Energy", key: "energy" },
      { label: "The handover, one press", key: "handover" },
    ],
  },
  {
    name: "Maintenance",
    anchor: "cmms",
    promise: "A maintenance system that needs no data entry.",
    all: "The whole capability",
    entries: [
      { label: "The plant under it", key: "plant" },
      { label: "The machine's type", key: "type" },
      { label: "Meters and plans", key: "meters" },
      { label: "From fault to job", key: "fault-to-job" },
      { label: "The technician's phone", key: "phone" },
      { label: "Parts and the shelf", key: "parts" },
      { label: "The record", key: "record" },
    ],
  },
  {
    name: "Enterprise Reporting",
    anchor: "reporting",
    promise: "The paperwork writes itself, sealed and signed.",
    all: "The whole capability",
    entries: [
      { label: "A reporting engine", key: "engine" },
      { label: "Bound to the tag, never typed", key: "design" },
      { label: "Compute, seal and sign", key: "seal" },
      { label: "The plant's letterhead, three languages", key: "letterhead" },
      { label: "The sheets a plant runs on", key: "sheets" },
      { label: "In the hand", key: "phone" },
      { label: "Energy", key: "energy" },
    ],
  },
];

export const PARTNERS: MenuColumn[] = [
  {
    name: "System Integrators",
    anchor: "partners-si",
    promise: "One platform for the whole plant. Integrated by you.",
    all: "The whole edition",
    entries: [
      // D97: was "One partner per market" - the clause D36 bars; this is the edition's own dek (p2)
      { label: "The partnership, before the product", key: "market" },
      { label: "The SCADA, live to the phone", key: "scada" },
      { label: "TimeLens and Tag Lens", key: "lenses" },
      { label: "The editor and the engine", key: "editor" },
      { label: "EMS, CMMS and EPS, with the SCADA", key: "modules" },
      { label: "A reporting engine, not a report server", key: "reports" },
      { label: "Who you sell to: ten situations", key: "situations" },
      { label: "What you sell, what you earn", key: "packages" },
      { label: "What we give you", key: "we-give" },
      { label: "Not a slide, a plant", key: "proof" },
      { label: "How it starts", key: "start" },
    ],
  },
  {
    name: "Machine builders · OEM",
    anchor: "partners-oem",
    promise: "Your machine becomes a service business.",
    all: "The whole edition",
    entries: [
      { label: "Ships with the machine, earns every year after", key: "offer" },
      { label: "The machine's own pages, on every screen", key: "scada" },
      { label: "The night your desk replays", key: "timelens" },
      { label: "Drawn once, shipped with every machine", key: "editor" },
      { label: "No server at the client: the remote desk", key: "remote-desk" },
      { label: "The line runs its orders, the machine its maintenance", key: "modules" },
      { label: "Your service knowledge, shipped with the machine", key: "type" },
      { label: "From the machine to the signed sheet", key: "reports" },
      { label: "The twelve OEM situations", key: "situations" },
      { label: "What you sell, what you earn", key: "packages" },
      { label: "What we give you", key: "we-give" },
      { label: "The first machine, together", key: "start" },
    ],
  },
  {
    name: "ERP vendors",
    anchor: "partners-erp",
    promise: "Close the loop between the order and the line.",
    all: "The whole page",
    entries: [
      { label: "The ERP sends the order, SOP runs it", key: "loop" },
      { label: "What comes back: made, used, stopped, repaired — signed", key: "record" },
      { label: "White-label and per-line bundles", key: "white-label" },
      { label: "Joint reference plants", key: "references" },
    ],
  },
  {
    name: "AI startups for industry",
    anchor: "partners-ai",
    promise: "Your model, our plant.",
    all: "The whole page",
    entries: [
      { label: "The substrate: plan, reality, every stop with a reason", key: "substrate" },
      { label: "Data with provenance, a live stream", key: "data" },
      { label: "One security model, one command door", key: "door" },
      { label: "Go to market together", key: "together" },
    ],
  },
];

export interface WhyEntry {
  title: string;
  key: string;
  line: string;
}

export const WHY: WhyEntry[] = [
  { title: "Integrated by birth", key: "born", line: "one database, one transaction, one set of rights — nothing to connect" },
  {
    title: "Availability is the architecture",
    key: "availability",
    line: "the edge holds the line; two servers, one address; the emergency HMI",
  },
  {
    title: "What no other platform does",
    key: "unique",
    line: "TimeLens · Tag Lens · the editor previews the line · the plant keeps its pages",
  },
  {
    title: "One key, from the register to the signed sheet",
    key: "one-key",
    line: "nothing mapped twice; count-weighted averages; a quality byte on every reading",
  },
  {
    title: "The record",
    key: "record",
    line: "computed on the server, sealed with a hash, signed by name — never edited, never withdrawn",
  },
  {
    title: "Rights decided in the database",
    key: "rights",
    line: "what a user may not see never reaches them — not the screen, not the export, not the sheet",
  },
  {
    title: "Nothing in the stack is sunsetting",
    key: "stack",
    line: "Postgres, TimescaleDB, one program at the edge, one renderer in the browser",
  },
  {
    title: "Through partners, in your market",
    key: "partners",
    line: "the integrator who installs it, the builder who ships it inside the machine",
  },
];

/** The five links of the header, in order (D77). */
export const HEADER = {
  platform: { label: "Platform", href: href("platform") },
  why: { label: "Why SOP", href: href("why") },
  capabilities: { label: "Capabilities", href: homeHash("capabilities") },
  partners: { label: "Partners", href: homeHash("partners") },
  // the contact band is on EVERY page, so the header CTA stays on the page the reader is on
  write: { label: "Write to us", href: "#write" },
  home: HOME,
};

/** The footer's row - only destinations that exist (D85 took Privacy and About off). */
export const FOOTER_LINKS = [
  // Home first: D85 took the Company and Privacy links off and left the footer with no way home
  { label: "Home", href: HOME },
  { label: "Platform", href: href("platform") },
  { label: "Why SOP", href: href("why") },
  { label: "Capabilities", href: homeHash("capabilities") },
  { label: "Partners", href: homeHash("partners") },
  { label: "Write to us", href: "#write" },
];
