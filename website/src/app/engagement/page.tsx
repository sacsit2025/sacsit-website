import type { Metadata } from "next";
import { Section, Container, Card, Button, FadeIn } from "@/components";

export const metadata: Metadata = {
  title: "Engagement Model | SACS-IT",
  description: "Milestone-driven delivery with optional independent verification. Pay for results, not promises.",
};

export default function EngagementPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(144,120,172,0.2)_0%,transparent_70%)]" />
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url(/assets/noise-texture.png)', backgroundRepeat: 'repeat' }} />
        </div>
        <Container className="relative z-10">
          <FadeIn>
            <p className="text-sm text-[#9078AC] font-medium uppercase tracking-widest mb-4">
              Engagement Model
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight max-w-3xl">
              Results-secured partnership
            </h1>
            <p className="text-xl text-white/60 max-w-2xl">
              Not a body shop. Not an agency that disappears. We partner for the long term.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Milestone Delivery */}
      <Section background="elevated" className="border-t border-white/[0.06]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <p className="text-sm text-[#9078AC] font-medium uppercase tracking-widest mb-4">
                Standard
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Milestone-Driven Delivery
              </h2>
              <p className="text-lg text-white/60 mb-8">
                Every project is scoped and priced by milestone, with clear acceptance criteria
                agreed upon upfront.
              </p>
              <ul className="space-y-4">
                {[
                  "Detailed scope and deliverables per milestone",
                  "Measurable acceptance criteria",
                  "Working software at every checkpoint",
                  "Full transparency on progress",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#9078AC]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-[#9078AC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] rounded-2xl p-8">
                <div className="space-y-6">
                  {["Discovery", "Milestone 1", "Milestone 2", "Milestone N", "Launch"].map((step, index) => (
                    <div key={step} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#9078AC]/20 text-[#9078AC] flex items-center justify-center font-mono text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-white/20 to-transparent" />
                      <div className="text-white/80 font-medium">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Verified Delivery */}
      <Section background="gradient-purple">
        <Container>
          <FadeIn>
            <div className="text-center mb-12">
              <p className="text-sm text-[#9078AC] font-medium uppercase tracking-widest mb-4">
                Optional
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Independently Verified Delivery
              </h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">
                For clients requiring additional assurance, we offer a bank-guaranteed delivery model.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            <FadeIn delay={100}>
              <Card variant="gradient" className="text-center h-full">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#9078AC]/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#9078AC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Third-Party Certification</h3>
                <p className="text-sm text-white/50">
                  Independent consultant certifies each milestone against agreed criteria.
                </p>
              </Card>
            </FadeIn>

            <FadeIn delay={200}>
              <Card variant="gradient" className="text-center h-full">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#9078AC]/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#9078AC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Bank-Backed Guarantee</h3>
                <p className="text-sm text-white/50">
                  Performance guarantee released only upon formal certification.
                </p>
              </Card>
            </FadeIn>
          </div>

        </Container>
      </Section>

      {/* Other Terms */}
      <Section background="dots">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn>
              <Card variant="bordered" hover={false} className="h-full">
                <h3 className="text-xl font-bold text-white mb-4">Ongoing Evolution</h3>
                <p className="text-white/60">
                  Post-delivery platform maintenance and evolution available on project or retainer basis.
                  We build for the long term.
                </p>
              </Card>
            </FadeIn>

            <FadeIn delay={100}>
              <Card variant="bordered" hover={false} className="h-full">
                <h3 className="text-xl font-bold text-white mb-4">Mutual Protection</h3>
                <ul className="space-y-2 text-white/60">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9078AC]" />
                    NDAs executed before any technical discussion
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9078AC]" />
                    IP ownership terms defined upfront
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9078AC]" />
                    Development methodologies remain proprietary
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9078AC]" />
                    Client business logic and data remain confidential
                  </li>
                </ul>
              </Card>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="elevated" className="border-t border-white/[0.06]">
        <Container size="narrow">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to discuss your project?
              </h2>
              <p className="text-lg text-white/60 mb-8">
                All engagements begin with a mutual NDA and a discovery call.
              </p>
              <Button href="/contact" variant="primary" size="lg">
                Start a Conversation
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
