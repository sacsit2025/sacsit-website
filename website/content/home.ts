/**
 * HOME - all of the page's copy and every asset it binds, typed, in band order.
 *
 * Provenance: lifted character for character out of the approved mock,
 * the approved Home mock (kept with the project's working record, outside this tree)
 * (Home copy v3.5), with the plate and screen bindings taken from that mock's own build table
 * (`_build/build-home3.py`, SLOTS and SHOTS). D87: the copy lives here, never inside JSX. D94: the
 * React page is faithful to the approved sheet - same bands, same words, same order.
 *
 * Rulings folded in: D70 (four hero scenes - WB-01, 01b, 01d, 01e), D75 (the backbone is the drawn
 * SVG), D85 (no About and no Privacy anywhere), D86 + D89 ("Get the file" is a form-gated download
 * in React: each shelf row carries the document's id and title for <DocumentButton>), D91 (the hero
 * keeps its four stills and gains the living-still canvas), D96 (band 8 no longer carries the
 * exclusivity or the end-client clause).
 *
 * Inline markup is the `rich()` subset only (<b> <em> <i> <code> <br>, `backticks` for mono) -
 * see lib/rich.tsx. A non-breaking space is written \u00a0 so it cannot be lost in an edit.
 */
import type { BlockSection } from "@/lib/spec";
import { href } from "./routes";

/** One image: where it lives in the knowledge base (the ASSET LAW) and what it shows. */
export interface Plate {
  path: string;
  alt: string;
}

/** A link the band prints: the words, and where they go. A "#..." href is an anchor on Home itself. */
export interface Go {
  label: string;
  href: string;
}

export interface HeroBand {
  kicker: string;
  h1: string;
  dek: string;
  sig: string;
  /** the four still scenes, cross-faded by design.css in this order */
  scenes: Plate[];
}

export interface PlatformBand {
  kicker: string;
  h2: string;
  lead: string;
  link: Go;
  plate: Plate;
}

export interface AvailabilityBand {
  kicker: string;
  h2: string;
  paragraphs: { title: string; text: string }[];
  /** the mono rule under the three paragraphs */
  lines: string;
  link: Go;
  plate: Plate;
  /** the four chips beside the plate: a display lead, then the mono line */
  four: { lead: string; text: string }[];
}

export interface ArchitectureBand {
  kicker: string;
  h2: string;
  intro: string;
  drawing: Plate;
  /** the five ring-glyph entries; the glyphs themselves are markup (components/sections/Glyphs) */
  legend: { title: string; line: string }[];
  steps: { n: string; title: string; text: string }[];
  lines: string;
}

/** One of the four numbered capability blocks (the plate left, the list right, screens under). */
export interface CapabilityBlock {
  /** the anchor the capability index jumps to */
  id: string;
  n: string;
  of: string;
  name: string;
  promise: string;
  plate: Plate;
  /** the capability's own page - the menu links to it; Home's block prints no link (D94) */
  page: string;
  items: string[];
  label: string;
  screens: { asset: string; alt: string; caption: string }[];
}

/** SCADA opens the five: a head with a plate, then block A and block B in block A's dress (D72). */
export interface ScadaBlock {
  id: string;
  n: string;
  of: string;
  name: string;
  plate: Plate;
  page: string;
  blockA: BlockSection;
  blockB: BlockSection;
}

export interface CapabilitiesBand {
  id: string;
  kicker: string;
  h2: string;
  lead: string;
  index: { n: string; name: string; href: string }[];
  scada: ScadaBlock;
  blocks: CapabilityBlock[];
  under: { text: string; link: Go };
}

export interface DifferencesBand {
  kicker: string;
  h2: string;
  intro: string;
  items: { kicker: string; title: string; text: string }[];
  cta: Go;
}

export interface LicenceBand {
  kicker: string;
  h2: string;
  text: string;
  link: Go;
}

export interface PartnersBand {
  id: string;
  /** the wide plate that opens the band, above the words */
  band: Plate;
  kicker: string;
  h2: string;
  intro: string;
  models: { title: string; promise: string; text: string; link: Go }[];
}

export interface AudiencesBand {
  kicker: string;
  h2: string;
  groups: {
    label: string;
    cards: { plate: Plate; title: string; trigger: string; text: string }[];
  }[];
}

export interface CompanyBand {
  kicker: string;
  h2: string;
  lead: string;
  plate: Plate;
}

export interface MaterialBand {
  id: string;
  kicker: string;
  h2: string;
  /** the words on all eight buttons */
  cta: string;
  documents: {
    /** the document the download gate asks for (D89) */
    id: string;
    title: string;
    meta: string;
    /** the two lines printed on the navy cover */
    cover: string[];
  }[];
}

export interface ContactBand {
  id: string;
  kicker: string;
  h2: string;
  /** the word DESKS is replaced by the tokens (the page kit's convention, lib/spec.ts) */
  text: string;
  desks: string[];
  cta: Go;
  plate: Plate;
}

/** The page's own <title> and meta description - the mock's title, and the hero's dek. */
export const meta = {
  title: "SOP · SCADA Open Platform",
  description: "SCADA, Execution Manufacturing System, Equipment Performance System, maintenance and Enterprise Reporting — one platform born on one database, not five products joined by connectors.",
};

/** 1 - the hero: four scenes, the headline, the dek, the signature. */
export const hero: HeroBand = {
  kicker: "SOP · SCADA Open Platform",
  h1: "The whole plant, integrated by birth.",
  dek: "SCADA, Execution Manufacturing System, Equipment Performance System, maintenance and Enterprise Reporting — one platform born on one database, not five products joined by connectors.",
  sig: "A platform by SACS-IT",
  scenes: [
    {
      path: "knowledge/assets/wb/WB-01.jpg",
      alt: "",
    },
    {
      path: "knowledge/assets/wb/WB-01b.jpg",
      alt: "",
    },
    {
      path: "knowledge/assets/wb/WB-01d.jpg",
      alt: "",
    },
    {
      path: "knowledge/assets/wb/WB-01e.jpg",
      alt: "",
    },
  ],
};

/** 2 - the platform: one paragraph and the plate. */
export const platform: PlatformBand = {
  kicker: "The platform",
  h2: "One platform. Born integrated.",
  lead: "SCADA, Execution Manufacturing System, Equipment Performance System, maintenance and Enterprise Reporting are not five products that talk to each other through connectors. They were born on one database, in the same transaction, under the same rights: what the operator watches, what the line runs, what maintenance plans and what the auditor signs are the same rows — so they cannot disagree, and there is nothing to connect, because there is nothing to connect.",
  link: {
    label: "Discover the platform",
    href: href("platform"),
  },
  plate: {
    path: "knowledge/assets/wb/WB-02b.jpg",
    alt: "an engineer at a workstation, the whole line as one page on the screen",
  },
};

/** 3 - availability: the three paragraphs, the mono rule, the plate and the four chips. */
export const availability: AvailabilityBand = {
  kicker: "Built to never lose the plant",
  h2: "Availability is the architecture, not an option.",
  paragraphs: [
    {
      title: "The edge holds the line; the server holds the plant.",
      text: "One program beside the PLC reads the machines, judges the alarms and keeps the readings; the server holds the one database every capability runs on — the screens, the orders, the lost hours, the jobs and the record. Cut the network and the readings wait on the edge's own disk, then fill the gap in when the link returns: a server that stops loses no plant data, because the plant's data is kept at the edge until the server is back. Where a line cannot afford to lose its edge, a second one stands on the same devices and takes over.",
    },
    {
      title: "Two servers for the whole plant.",
      text: "Where every SCADA engine used to need its own standby — or a ring of servers standing by for each other — SOP protects dozens of lines with two: one duty, one standby, one address the plant dials. The standby takes the address the moment the duty stops, with nothing lost; a planned handover is a button that refuses unless both are in step; and the standby is part of the platform, not a second purchase.",
    },
    {
      title: "The emergency HMI — we know of no other platform that does this.",
      text: "If both servers are unreachable, the operators keep running the plant from the edge itself: no extra HMI panel, no second application — the same SCADA pages the server designed are already stored on the edge, and the edge serves them directly to the operators, with the same symbols, the same commands, live values and standing alarms, until the centre is back.",
    },
  ],
  lines: "Adding a way to stay up costs a setting, not a licence. \u00a0·\u00a0 Proven in anger: a day-long cut of the history link, the lines still running on the plant's own edge, the missing hours back-filled in seconds when it returned — unattended. \u00a0·\u00a0 Not one of these changes a screen anybody uses.",
  link: {
    label: "How the plant stays up",
    href: href("why", "availability"),
  },
  plate: {
    path: "knowledge/assets/wb/WB-03b.jpg",
    alt: "the plant's server room, five people at work, the line through the glass",
  },
  four: [
    {
      lead: "The edge",
      text: "holds the line · buffers · back-fills itself",
    },
    {
      lead: "The server",
      text: "holds the plant · your hardware, air-gapped, or a cloud backbone",
    },
    {
      lead: "The pair",
      text: "two servers for the whole plant · one address moves",
    },
    {
      lead: "The edge again",
      text: "the same pages, served directly when both servers are unreachable",
    },
  ],
};

/** 4 - the architecture: the drawn backbone, its ring legend, the six steps. */
export const architecture: ArchitectureBand = {
  kicker: "The architecture",
  h2: "One database. One history. One key, from the controller's register to the signed sheet.",
  intro: "The edges beside their controllers, live channels both ways, two servers with one address, one database with the plant's whole history compressed beside it — and every screen, order, job and signed sheet drawn from the same rows.",
  drawing: {
    path: "knowledge/assets/wb/WB-04.svg",
    alt: "the backbone, drawn: six controllers, six edges with one doubled, six channels to the plinth, two servers under one address, the core and its history",
  },
  legend: [
    {
      title: "The controllers · the outer ring",
      line: "the plant's PLCs and field devices, on the machines they drive",
    },
    {
      title: "The edges · the inner ring",
      line: "one beside each controller, some in pairs · reads · judges · keeps · serves",
    },
    {
      title: "The channels",
      line: "every edge to the core · readings in, commands out · live, both ways",
    },
    {
      title: "The pair",
      line: "duty and standby · one address the plant dials",
    },
    {
      title: "The core",
      line: "one database, Postgres · the history compressed beside it, TimescaleDB",
    },
  ],
  steps: [
    {
      n: "01",
      title: "The edge",
      text: "One program beside the PLC: it reads the machines, judges the alarms, keeps the data and serves the pages; it runs redundant against the same devices.",
    },
    {
      n: "02",
      title: "The database and the history",
      text: "One database for the plant and one history beside it, on the same box, never two systems to reconcile. The history is part of the platform, not a product beside it: the same database the screen is already drawing from, and every operator already has it.",
    },
    {
      n: "03",
      title: "The mathematics",
      text: "Averages are count-weighted, never an average of averages; a quality byte rides every reading, so a number the plant should not trust says so; correct a value from years ago and every total since corrects itself; ask for a month of a slow signal and it draws as fast as a short window — and the chart names the resolution it used.",
    },
    {
      n: "04",
      title: "The key",
      text: "One key follows a signal from the PLC register to the pixel, the trend, the batch, the work order and the printed sheet. Nothing is mapped a second time.",
    },
    {
      n: "05",
      title: "The rights",
      text: "Who may open a page and who may send a command is decided in the database, not in a menu on a screen: what a user may not see never reaches them — not the screen, not the export, not the printed sheet.",
    },
    {
      n: "06",
      title: "The reporting engine",
      text: "The documents an auditor, a customer validation or a recall drill ask for — computed on the server, frozen, numbered, sealed with a hash anyone can check outside the building, signed by name and capacity, never edited, never withdrawn.",
    },
  ],
  lines: "One database, Postgres; one historian beside it, TimescaleDB; the plant and its history on the same box — dozens of lines, every reading, on two servers. Nothing in the stack is sunsetting.",
};

/** 5 - the five capabilities: the index, SCADA's two blocks, the four numbered blocks. */
export const capabilities: CapabilitiesBand = {
  id: "capabilities",
  kicker: "Capabilities",
  h2: "Five capabilities. One platform.",
  lead: "SCADA first — the plant's screens, alarms, trends and history — then the four business capabilities born on the same rows: Execution Manufacturing System, Equipment Performance System, maintenance and Enterprise Reporting.",
  index: [
    {
      n: "01",
      name: "SCADA",
      href: "#cap-scada",
    },
    {
      n: "02",
      name: "Execution Manufacturing System",
      href: "#cap-ems",
    },
    {
      n: "03",
      name: "Equipment Performance System",
      href: "#cap-eps",
    },
    {
      n: "04",
      name: "Maintenance",
      href: "#cap-cmms",
    },
    {
      n: "05",
      name: "Enterprise Reporting",
      href: "#cap-rep",
    },
  ],
  scada: {
    id: "cap-scada",
    n: "01",
    of: "05",
    name: "SCADA",
    plate: {
      path: "knowledge/assets/wb/WB-05.jpg",
      alt: "a wall panel and a phone showing the same page",
    },
    page: href("scada"),
    blockA: {
      type: "blockA",
      title: "Everything a SCADA does, it does:",
      screen: {
        asset: "knowledge/assets/screens/shot-editor-preview.png",
        chrome: "the page designer · Beverage Line 7 · Preview",
        alt: "the page designer in Preview: the operator's own screen on the plant's real values",
        caption: "The page designer in Preview: the operator's own screen on the plant's real values, while the work is still being done",
      },
      items: [
        {
          lead: "Synoptics",
          text: "the whole line at a glance on one synoptic, live, on the wall panel, the desk and the phone",
        },
        {
          lead: "Machines",
          text: "a faceplate on every machine: its values, a small trend, its alarms, its causes, its commands and its documents",
        },
        {
          lead: "Commands",
          text: "attributed, timestamped, and refused in the database when the person may not",
        },
        {
          lead: "Alarms",
          text: "prioritised, acknowledged by name, shelved with a reason and a return time; the journal that keeps every one; the insights ISA-18.2 and EEMUA 191 ask for — the rate against its target, the response times, the flood episodes, the alarms that raise most; the shift handover sheet",
        },
        {
          lead: "Trends",
          text: "two cursors and the numbers across the span; shift-aware windows on the plant's clock; annotations that stay with your name and the time; a stamped export; a link that opens the same window for a colleague",
        },
        {
          lead: "History",
          text: "every reading kept; a month of a slow signal drawn as fast as an hour",
        },
        {
          lead: "Engineering",
          text: "a browser editor with live preview against the running line; a symbol library by equipment family; a line travels to the next plant as one file",
        },
        {
          lead: "Rights and record",
          text: "users, groups and rights down to one page, one signal, one module; the audit journal across the fleet",
        },
        {
          lead: "Languages and panels",
          text: "three languages, right to left included; the pinned panel that shows one line and nothing else",
        },
        {
          lead: "Drivers and servers",
          text: "the drivers a plant needs — Modbus, OPC DA, Siemens S7 and OPC UA among them; duty and standby servers",
        },
      ],
    },
    blockB: {
      type: "blockB",
      title: "And what no other platform does like us",
      screens: [
        {
          asset: "knowledge/assets/screens/shot-timelens.png",
          chrome: "TimeLens · Beverage Line 7 · replay",
          alt: "TimeLens: the synoptic replayed, the gold bar",
          caption: "TimeLens · the same synoptic replayed from the history — the gold bar, the alarms at that moment, commands off",
        },
        {
          pair: [
            "knowledge/assets/screens/shot-taglens-card.png",
            "knowledge/assets/screens/shot-taglens-thread.png",
          ],
          chrome: "Tag Lens · BLD-AIT-2201 · the card and the thread",
          alt: "Tag Lens: one signal, everywhere it is used",
          caption: "Tag Lens · one signal: its identity card, and the thread of every page, trend, alarm, report block and formula that uses it — and what if, before the change",
        },
      ],
      items: [
        {
          lead: "One synoptic, every screen",
          text: "One synoptic drawn once and served on every screen, live — the wall panel, the desk and the phone serve the same page; nothing installed, no separate app.",
        },
        {
          lead: "The editor previews the line, not sample numbers",
          text: "The page designer's second mode is the operator's own screen, on the plant's real values; the signal list, the binder and the trend read the running line while the work is still being done.",
        },
        {
          lead: "Tag Lens",
          text: "One signal followed through every page, trend, alarm, report block and formula; press <em>what if</em> and every one of them shows its own fate before the tag is touched. We know of no other platform that follows one tag through every module of the plant.",
        },
        {
          lead: "TimeLens",
          text: "Any page replays from the history, back and forward, alarm to alarm, or straight to a moment; the replayed screen wears gold and its commands are off.",
        },
        {
          lead: "An alarm is an event with a record",
          text: "Prioritised, acknowledged by name, shelved with a reason and a return time; delete the rule and every alarm it raised stays in the journal.",
        },
        {
          lead: "Every machine carries its own door",
          text: "Its values, a small trend, its own alarms, its causes, its commands and its documents; put the datasheet in once and it opens at the machine.",
        },
        {
          lead: "The engineer draws the chart; the operator finishes it",
          text: "Two cursors, the numbers across the span, add a curve and keep it.",
        },
        {
          lead: "Engineered in a browser",
          text: "A line travels to the next plant as one file.",
        },
      ],
    },
  },
  blocks: [
    {
      id: "cap-ems",
      n: "02",
      of: "05",
      name: "Execution Manufacturing System",
      promise: "The line runs its own orders.",
      plate: {
        path: "knowledge/assets/wb/WB-06.jpg",
        alt: "the end of a packaging line, the supervisor with the job board",
      },
      page: href("ems"),
      items: [
        "The plant is described once: the batch vessel sizes the batch, the last stage's counter gives the good count; nobody types a quantity.",
        "The formula is signed before the plant may run it; approving a new version retires the old in the same breath, and every batch keeps the copy it ran with.",
        "One press mints the order, every batch, its window and the line's own tags; a wash, a changeover or a shutdown is planned, not suffered.",
        "<b>Nobody presses start</b>: the line begins and ends its own jobs from two signals, stamped with the plant's own clock.",
        "<b>Batches overlap, because lines do</b> — and you choose who decides a boundary, the plant or the counters, and change it live within a minute with no restart.",
        "Every number says who measured it: counted, declared, or held by the arithmetic; the lab's signed count outranks the machine counter and both stay on the record; what cannot be known stays blank, never zero.",
        "The board an operator can read from the aisle: one card per job, the batches as chips, the next boundary forecast — and the Quality door signed from the same screen.",
        "No second store, no batch server, no line of code at the edge: the certificate prints from the engine that prints the shift handover.",
      ],
      label: "Seen in the product",
      screens: [
        {
          asset: "knowledge/assets/screens/home/EMS-plan-month-day-panel.png",
          alt: "the plan, one month, one day opened",
          caption: "The plan · a month of orders on one line, one day opened: two orders, two batches, the real windows against the planned ones",
        },
        {
          asset: "knowledge/assets/screens/home/EMS-job-panel-batches-per-machine.png",
          alt: "one job, its batches, per machine",
          caption: "One job · cases ordered and made, the recipe it ran with, the line's five machines, the two batches planned against actual",
        },
      ],
    },
    {
      id: "cap-eps",
      n: "03",
      of: "05",
      name: "Equipment Performance System",
      promise: "Lost hours stop being an opinion. Every one has a name.",
      plate: {
        path: "knowledge/assets/wb/WB-07.jpg",
        alt: "the restart moment: a guard closed, the stop named on the panel",
      },
      page: href("eps"),
      items: [
        "One calculation, on the server, for every screen: the wall tile, the synoptic, the report block and the exported table are the same arithmetic and cannot disagree.",
        "The stop is named at the restart, <b>in two taps</b> — nobody is interrupted while the line is down, and the short stops are never a popup.",
        "A backlog no period can hide: every unnamed stop from commissioning to this minute, ranked by what it cost; forty small stops named in one drag.",
        "<b>Two honest OEEs</b> over any window — what the machine could have made, and whether the jobs met the rate their own recipe promised; one number cannot answer two fair questions.",
        "Six bands turn a bad percentage into minutes, units and money; the four loss families ranked in one glance; breakdowns, longest first.",
        "Quality counts the first pass, every time; a signed verdict restates without erasing — nothing anybody wrote is ever quietly removed.",
        "A dash, never a flattering zero; a planned wash or a released maintenance job leaves the availability number — doing the right thing stops being punished.",
        "The shift printed, sealed and signed in one press, from the same engine as the batch certificate.",
      ],
      label: "Seen in the product",
      screens: [
        {
          asset: "knowledge/assets/screens/home/EPS-period-sheet-where-the-time-went.png",
          alt: "one day on one line, where the time went",
          caption: "One day on one line · the minutes lost hour by hour, the verdict against the plan, and where the time went — six bands, in minutes and units",
        },
      ],
    },
    {
      id: "cap-cmms",
      n: "04",
      of: "05",
      name: "Maintenance",
      promise: "A maintenance system that needs no data entry.",
      plate: {
        path: "knowledge/assets/wb/WB-08.jpg",
        alt: "a technician with the checklist on a phone at an opened machine",
      },
      page: href("cmms"),
      items: [
        "It opens on a plant that is already there: the machines, their kinds, their run history and their alarms — maintenance is arithmetic over what the SCADA already writes.",
        "<b>One word plants the whole maintenance package</b>: the machine's type carries its parts, its plans, its checklists, the spares each job needs and the words a fitter picks from when something breaks.",
        "<b>A meter nobody types cannot drift</b>: running hours and starts are folded from the line's own run record; correct an offset once and every total since corrects itself.",
        "Five ways a plan comes due — on a date, days since the last, on a counter, when a tag says so, after too many breakdowns — and a follow-up born from a signed repair, only when something was found.",
        "The stop becomes the job in one tap, from the restart receipt or the alarm itself, so the job and the alarm can never point at different events; every job is born a draft, a supervisor releases.",
        "The phone is the technician's whole tool: take it, a reading judged red at the box, a spare off the shelf, a photograph, sign — every press writes at once.",
        "The shelf answers before the technician walks to it: stock is the sum of its movements, shortages pinned on top naming the jobs they hold.",
        "A record nobody signed is a note: the maintenance record, the week ahead, the review with mean time between failures and mean time to repair, the bad actors, the audit sheet — a dash and how many, never a confident zero.",
      ],
      label: "Seen in the product",
      screens: [
        {
          asset: "knowledge/assets/screens/home/CMMS-machines-board.png",
          alt: "the machines, running hours against the next service",
          caption: "The machines · every machine's open jobs, its running hours against the next service, mean time between failures and mean time to repair",
        },
        {
          asset: "knowledge/assets/screens/home/CMMS-the-board-job-panel-crop.png",
          alt: "the maintenance board, one job opened",
          caption: "The board · what is overdue, due today, short of a part; one job opened — why now, its checklist, its part on the shelf, one press to release",
        },
      ],
    },
    {
      id: "cap-rep",
      n: "05",
      of: "05",
      name: "Enterprise Reporting",
      promise: "A reporting engine, not a report server.",
      plate: {
        path: "knowledge/assets/wb/WB-09.jpg",
        alt: "a supervisor signing the shift handover on a tablet on the floor",
      },
      page: href("reporting"),
      items: [
        "Every sheet the plant needs, and what makes it appear: <b>per shift · daily · weekly · monthly · per batch · per production order · per maintenance job · per cycle of a condition · on an excursion · since it last ran · any window you type.</b> Nobody presses anything.",
        "Ready-made and yours to change: <b>the shift handover · the batch certificate · the maintenance record · the audit sheet for the machines the auditor names · the excursion investigation · the monthly review.</b>",
        "Blocks bound to the plant's own tags, never typed in: headline tiles against the plan tag, period tables, trends carrying their own alarm limits, bar, donut and scatter charts, gauges, heatmaps, machine timelines, alarm journals and rankings, consumption priced from a dated rate book, the performance cascade, the maintenance blocks.",
        "Computed on the server, frozen on arrival, numbered, sealed with a hash anyone can check outside the building, signed by name and capacity with the signer's own password — never edited, never withdrawn; a re-run is a second document beside the first.",
        "On the plant's own letterhead in three languages, right to left included; mailed to a list, filed as PDF, exported for the numbers; every run ever filed reprinted one press away.",
        "Read it, print it, sign it, from a phone — the supervisor who signs the handover signs it on the floor.",
        "One clock, one key, one archive: the same shift on every module, one signal one identity, every sheet filed side by side and none removable; what a person may not see on the line, they may not read on the paper.",
      ],
      label: "Seen in the product",
      screens: [
        {
          asset: "knowledge/assets/screens/home/REP-daily-production-sheet.png",
          alt: "a daily production sheet",
          caption: "A daily production sheet · headline tiles against the previous period, then the period tables by shift",
        },
        {
          asset: "knowledge/assets/screens/home/REP-editor-batch-certificate-crop.png",
          alt: "the report editor",
          caption: "The report editor · the blocks, the live preview, the name in three languages, the timing, who gets it",
        },
      ],
    },
  ],
  under: {
    text: "In the class, these are separate products with their own databases and licences, joined by connectors and an integration project. Here they are the same rows. Adding a capability is a migration, not a project.",
    link: {
      label: "See the capabilities",
      href: "#capabilities",
    },
  },
};

/** 6 - what makes SOP different: eight cells on navy. */
export const differences: DifferencesBand = {
  kicker: "Why SOP",
  h2: "What makes SOP different.",
  intro: "Integrated by birth — and everything that follows from it.",
  items: [
    {
      kicker: "Born integrated",
      title: "Nothing to connect, because there is nothing to connect.",
      text: "The work order and the PLC tag are rows in the same database, under the same rights, in the same transaction; a tile, a sheet and a scheduled report cannot disagree.",
    },
    {
      kicker: "Availability",
      title: "Availability is the architecture, not an option.",
      text: "The edge keeps the line's data; two servers with one moving address protect the whole plant; adding a way to stay up costs a setting, not a licence.",
    },
    {
      kicker: "The emergency HMI",
      title: "We know of no other platform that does this.",
      text: "Both servers unreachable, the operators keep the plant's own pages on the line — live values, alarms, commands — until the centre is back.",
    },
    {
      kicker: "Tag Lens",
      title: "One tag, followed through every module of the plant.",
      text: "Every page, trend, alarm, report block and formula that uses a signal shows its fate before the signal is touched — we know of no other platform that does this either.",
    },
    {
      kicker: "The editor",
      title: "It previews the line, not sample numbers.",
      text: "The page designer's second mode is the operator's own screen on the plant's real values; the editor reads the running line while you draw.",
    },
    {
      kicker: "The reporting engine",
      title: "A reporting engine, not a report server.",
      text: "Every sheet the plant signs, born on the server, sealed and signed on the plant's own letterhead — no report server, no second designer, no seat to read.",
    },
    {
      kicker: "Rights",
      title: "What a user may not see never reaches them.",
      text: "Decided in the database, not on the screen — the same rule filters the export and the printed sheet.",
    },
    {
      kicker: "TimeLens",
      title: "Any screen rewinds, with no second recorder.",
      text: "Any synoptic replays from the history the plant already keeps, alarm to alarm or straight to a moment; commands off while you look back.",
    },
  ],
  cta: {
    label: "All the differences",
    href: href("why"),
  },
};

/** 7 - the licence. */
export const licence: LicenceBand = {
  kicker: "The licence",
  h2: "One platform, one licence per line you deploy.",
  text: "Perpetual, per deployed line, on your own hardware or on the cloud backbone. The business capabilities — Execution Manufacturing System, Equipment Performance System, maintenance — per line, per year, support and updates inside. Full figures in the SOP Price List, through your partner.",
  link: {
    label: "How the licence works",
    href: "#write",
  },
};

/** 8 - partners: the wide plate, then the two partnership models (D96: no exclusivity clause). */
export const partners: PartnersBand = {
  id: "partners",
  band: {
    path: "knowledge/assets/wb/WB-11.jpg",
    alt: "a demonstration on the plant floor",
  },
  kicker: "Partners",
  h2: "Delivered through partners who know the factory.",
  intro: "SOP reaches a plant through a partner — the system integrator who installs it and trains the crew, or the machine builder who ships it inside the machine. Two partnership models:",
  models: [
    {
      title: "System integrators",
      promise: "One platform for the whole plant. Integrated by you.",
      text: "Trained and backed by us: annual training, unlimited technical support, a manual and a flight-test document for every capability, a demonstration plant, our engineers beside yours on the first project, a server package that installs from scripts in a single session. The engineering, the commissioning and the support at the plant are yours.",
      link: {
        label: "For system integrators",
        href: href("partners-si"),
      },
    },
    {
      title: "Machine and line builders",
      promise: "Your machine becomes a service business. Ships with the machine. Earns every year after.",
      text: "The machine leaves your hall with its own pages, its record and its maintenance package; a licence per line; the cloud backbone by default or the client's own server; \"powered by SOP\", in your brand.",
      link: {
        label: "For machine and line builders",
        href: href("partners-oem"),
      },
    },
  ],
};

/** 9 - who SOP is for: ten target cards in two groups. */
export const audiences: AudiencesBand = {
  kicker: "Who SOP is for",
  h2: "The plants our partners serve.",
  groups: [
    {
      label: "Through system integrators",
      cards: [
        {
          plate: {
            path: "knowledge/assets/wb/WB-12.jpg",
            alt: "an ageing industrial PC",
          },
          title: "A SCADA at end of life",
          trigger: "The renewal invoice, an unsupported Windows, a discontinued version.",
          text: "Migration line by line, the PLCs kept; the record, EMS and CMMS arrive with the migration, not as three more products.",
        },
        {
          plate: {
            path: "knowledge/assets/wb/WB-13.jpg",
            alt: "a wall monitor and a paper logbook",
          },
          title: "A plant that sees its line and knows nothing about last night",
          trigger: "\"We see the line. We know nothing about last night's production, or when that pump was serviced.\"",
          text: "The complete EMS and CMMS on the existing PLCs; the whole plant on one database with no integration project.",
        },
        {
          plate: {
            path: "knowledge/assets/wb/WB-14.jpg",
            alt: "the quality manager and the certificate",
          },
          title: "A regulated producer facing an audit",
          trigger: "Food, beverage, pharma, cosmetics, chemicals: a customer audit, a recall drill.",
          text: "Signed recipes, batch certificates, sealed and signed reports, the maintenance record — no report server.",
        },
        {
          plate: {
            path: "knowledge/assets/wb/WB-15.jpg",
            alt: "a pumping station at dawn",
          },
          title: "A remote, harsh or air-gapped site",
          trigger: "Water, mining, utilities, oil and gas, defence: no reliable link, no cloud allowed, no IT on site.",
          text: "The scripted install, duty and standby, the emergency HMI, a licence carried in on two strings.",
        },
        {
          plate: {
            path: "knowledge/assets/wb/WB-16.jpg",
            alt: "the headquarters room, five plant tiles",
          },
          title: "A group with several plants",
          trigger: "The board wants one truth across sites; every plant reports differently.",
          text: "The central backbone, one project per line, consolidated reports; a line travels as one file to the next plant.",
        },
      ],
    },
    {
      label: "Through machine and line builders",
      cards: [
        {
          plate: {
            path: "knowledge/assets/wb/WB-17.jpg",
            alt: "an older machine, a fresh edge box beside its cabinet",
          },
          title: "The installed base, earning nothing since delivery",
          trigger: "\"We sold so many of these; they earn nothing after delivery.\"",
          text: "The retrofit at the next service visit: a record, a history, the maintenance package, remote assistance from your desk.",
        },
        {
          plate: {
            path: "knowledge/assets/wb/WB-18.jpg",
            alt: "a new line in commissioning",
          },
          title: "A new machine in a plant without a system",
          trigger: "\"We want to see the machine from the office, and keep what it did.\"",
          text: "The machine on SOP: its pages, alarms, trends and record; nothing installed at the client.",
        },
        {
          plate: {
            path: "knowledge/assets/wb/WB-19.jpg",
            alt: "two people over a tablet, a signed sheet",
          },
          title: "A performance to prove at acceptance",
          trigger: "\"Show me the line does what the contract says.\"",
          text: "The line judged against the rate you promised, every loss named, the acceptance signed by both sides.",
        },
        {
          plate: {
            path: "knowledge/assets/wb/WB-20.jpg",
            alt: "a builder's service desk at night",
          },
          title: "A delivered fleet that stops at night, a flight away",
          trigger: "\"The client is a flight away and the line stopped at night.\"",
          text: "The remote desk: the live pages, the journal, the trend, the replay — the first technician arrives knowing, or does not travel.",
        },
        {
          plate: {
            path: "knowledge/assets/wb/WB-21.jpg",
            alt: "a technician and an engineer at an opened machine",
          },
          title: "The client who only calls when it breaks",
          trigger: "\"They call us when it breaks, and only then.\"",
          text: "Your service knowledge running the client's maintenance; the spares call comes to you because your number is on the part.",
        },
      ],
    },
  ],
};

/** 10 - who develops SOP. */
export const company: CompanyBand = {
  kicker: "Company",
  h2: "Built by automation engineers who have stood on a plant floor.",
  lead: "Twenty-five years of experience implementing projects in food and beverage, oil and gas, residential, utilities and energy stand behind SOP — sixteen of them in the field, seven in research and development. Nothing in the stack is sunsetting: Postgres, TimescaleDB, one program at the edge, one renderer in the browser.",
  plate: {
    path: "knowledge/assets/wb/WB-22.jpg",
    alt: "two automation engineers at an open control cabinet at commissioning",
  },
};

/** 11 - information material: the shelf of eight documents. */
export const material: MaterialBand = {
  id: "material",
  kicker: "Information material",
  h2: "Eight documents, yours to read before you decide anything.",
  cta: "Get the file",
  documents: [
    {
      id: "platform",
      title: "SOP — the platform",
      meta: "pdf · 14 pages",
      cover: [
        "SOP",
        "THE PLATFORM",
      ],
    },
    {
      id: "scada",
      title: "SCADA Core",
      meta: "pdf · 18 pages",
      cover: [
        "SCADA",
        "CORE",
      ],
    },
    {
      id: "ems",
      title: "EMS · Execution Manufacturing System",
      meta: "pdf · 16 pages",
      cover: [
        "EMS",
        "MODULE",
      ],
    },
    {
      id: "eps",
      title: "EPS · Equipment Performance System",
      meta: "pdf · 14 pages",
      cover: [
        "EPS",
        "MODULE",
      ],
    },
    {
      id: "cmms",
      title: "CMMS · Maintenance",
      meta: "pdf · 14 pages",
      cover: [
        "CMMS",
        "MODULE",
      ],
    },
    {
      id: "reporting",
      title: "Enterprise Reporting",
      meta: "pdf · 14 pages",
      cover: [
        "REPORTS",
        "MODULE",
      ],
    },
    {
      id: "integrators",
      title: "Integrators Edition",
      meta: "pdf · 18 pages",
      cover: [
        "INTEGRATORS",
        "EDITION",
      ],
    },
    {
      id: "oem",
      title: "OEM Edition",
      meta: "pdf · 20 pages",
      cover: [
        "OEM",
        "EDITION",
      ],
    },
  ],
};

/** 12 - write to us. */
export const contact: ContactBand = {
  id: "write",
  kicker: "Contact",
  h2: "Write to us.",
  text: "Start with one word so it reaches the right desk: DESKS. Tell us the country, what the line or machine produces, and which controllers are already on it. We reply from a person, never a queue.",
  desks: [
    "PARTNER",
    "PLANT",
    "PRESS",
    "INVEST",
  ],
  cta: {
    label: "Write to us",
    href: "#write",
  },
  plate: {
    path: "knowledge/assets/wb/WB-10.jpg",
    alt: "an engineer at an open cabinet noting the controllers on the line",
  },
};
