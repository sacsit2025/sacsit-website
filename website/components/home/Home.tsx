import Hero from "./Hero";
import Platform from "./Platform";
import Availability from "./Availability";
import Architecture from "./Architecture";
import Capabilities from "./Capabilities";
import Differences from "./Differences";
import Licence from "./Licence";
import Partners from "./Partners";
import Audiences from "./Audiences";
import Company from "./Company";
import Material from "./Material";
import Contact from "./Contact";

/**
 * HOME - the twelve bands, in the approved order (Home mock v25, copy v3.5).
 *
 * 1 hero · 2 the platform · 3 availability · 4 the architecture · 5 the five capabilities ·
 * 6 what makes SOP different · 7 the licence · 8 partners · 9 who SOP is for · 10 the company ·
 * 11 information material · 12 write to us. The header and the footer belong to the layout.
 *
 * The anchors the menu and the footer point at ride on the bands that carry them in the mock:
 * #capabilities (5), #partners (8), #material (11), #write (12).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Platform />
      <Availability />
      <Architecture />
      <Capabilities />
      <Differences />
      <Licence />
      <Partners />
      <Audiences />
      <Company />
      <Material />
      <Contact />
    </>
  );
}
