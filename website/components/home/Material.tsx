import { Fragment } from "react";
import { rich } from "@/lib/rich";
import DocumentButton from "@/components/forms/DocumentButton";
import { material } from "@/content/home";

/**
 * Band 11 - the shelf of eight documents.
 *
 * D86 kept the eight "Get the file" buttons visible and deliberately unwired in the mocks
 * (`data-defer="react"`); D89 decided what they do: a short form, then the link. So each row's
 * button is <DocumentButton>, carrying the document's id and its title - the words on it come from
 * `documents.title` in messages/en.json, which are the mock's own ("Get the file").
 */
export function Material() {
  return (
    <section className="band mist" id={material.id}>
      <div className="wrap">
        <p className="kicker">{rich(material.kicker, "k")}</p>
        <h2>{rich(material.h2, "h2")}</h2>
        <div className="shelf">
          {material.documents.map((doc) => (
            <div className="doc" key={doc.id}>
              <div className="cover">
                <span>
                  <i></i>
                  {doc.cover.map((line, i) => (
                    <Fragment key={i}>
                      {i ? <br /> : null}
                      {line}
                    </Fragment>
                  ))}
                </span>
              </div>
              <div>
                <h4>{rich(doc.title, `h-${doc.id}`)}</h4>
                <p className="meta">{doc.meta}</p>
                <DocumentButton doc={doc.id} title={doc.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Material;
