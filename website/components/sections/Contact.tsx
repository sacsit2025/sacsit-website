import { Fragment, type ReactNode } from "react";
import ContactForm from "@/components/forms/ContactForm";
import { rich } from "@/lib/rich";
import type { ContactSection } from "@/lib/spec";
import { Pic } from "./Asset";

/** Home's own band, verbatim - the kit's CONTACT constant. A spec overrides one part at a time. */
const DEFAULTS = {
  kicker: "Contact",
  title: "Write to us.",
  text:
    "Start with one word so it reaches the right desk: DESKS. Tell us the country, what the line or " +
    "machine produces, and which controllers are already on it. We reply from a person, never a queue.",
  desks: ["PARTNER", "PLANT", "PRESS", "INVEST"],
  cta: "Write to us",
  plate: "knowledge/assets/wb/WB-10.jpg",
};

/** The kit's `r_contact()`: the "Write to us" band, with the desk chips spliced in where DESKS stands. */
export function Contact({ section: s }: { section: ContactSection }) {
  const kicker = s.kicker ?? DEFAULTS.kicker;
  const title = s.title ?? DEFAULTS.title;
  const text = s.text ?? DEFAULTS.text;
  const desks = s.desks ?? DEFAULTS.desks;
  const plate = s.plate ?? DEFAULTS.plate;

  // the kit replaces the word DESKS inside the sentence with the mono desk strip; here the sentence
  // is SPLIT on it and the strip put between the halves, so no markup is ever built from a string
  let body: ReactNode;
  if (desks.length) {
    const strip = (
      <span className="desk" key="desks">
        {desks.map((x, i) => (
          <Fragment key={i}>
            {i ? " · " : null}
            {rich(x, `d${i}`)}
          </Fragment>
        ))}
      </span>
    );
    const parts = text.split("DESKS");
    body = parts.flatMap((p, i) => (i ? [strip, rich(p, `x${i}`)] : [rich(p, "x0")]));
  } else {
    body = rich(text, "x0");
  }

  return (
    <div className="contact">
      <div className="measure">
        <p className="kicker">{rich(kicker, "k")}</p>
        <h2>{rich(title, "t")}</h2>
        <p>{body}</p>
        {/* the mock printed a button that pointed at this same band; the live page carries the form
            (D19: the desk token first, honeypot, time trap, Turnstile, then mailto as the fallback) */}
        <ContactForm />
      </div>
      {plate ? (
        <div>
          <Pic path={plate} slot="contact" alt={s.alt ?? ""} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Contact;
