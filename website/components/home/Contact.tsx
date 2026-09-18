import { Fragment } from "react";
import { rich } from "@/lib/rich";
import { Pic } from "@/components/sections/Asset";
import { contact } from "@/content/home";
import ContactForm from "@/components/forms/ContactForm";

/**
 * Band 12 - write to us: the desk words, then the plate.
 *
 * The sentence is SPLIT on the word DESKS and the mono strip put between the halves (the page kit's
 * convention, lib/spec.ts), so no markup is ever built out of a string. Where the mock had a button pointing at
 * this very band, the live page carries the form (D19).
 */
export function Contact() {
  const [before = "", after = ""] = contact.text.split("DESKS");
  return (
    <section className="band navy on-navy" id={contact.id}>
      <div className="wrap contact">
        <div className="measure">
          <p className="kicker">{rich(contact.kicker, "k")}</p>
          <h2>{rich(contact.h2, "h2")}</h2>
          <p>
            {rich(before, "before")}
            <span className="desk">
              {contact.desks.map((desk, i) => (
                <Fragment key={desk}>
                  {i ? " · " : null}
                  {desk}
                </Fragment>
              ))}
            </span>
            {rich(after, "after")}
          </p>
          {/* the mock's button pointed at this very band (a self-link); live, the band carries the
              form it promised - D19's fields, honeypot, time trap and Turnstile */}
          <ContactForm />
        </div>
        <div>
          <Pic path={contact.plate.path} slot="contact" alt={contact.plate.alt} />
        </div>
      </div>
    </section>
  );
}

export default Contact;
