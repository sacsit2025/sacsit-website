import type { Metadata } from "next";
import { Section, Container, Card, Button, FadeIn } from "@/components";

export const metadata: Metadata = {
  title: "Who We Work With | SACS-IT",
  description: "We are selective about partnerships. Deep technology work requires alignment between both parties.",
};

const idealPartners = [
  {
    title: "Companies Building a Platform",
    description: "You have domain expertise and market access, but you need a technical partner to architect and build the platform.",
  },
  {
    title: "Enterprises Digitizing Operations",
    description: "You need custom platforms — not off-the-shelf SaaS — to transform how your business operates.",
  },
  {
    title: "Funded Ventures",
    description: "You have the vision and resources. You need a partner who designs for scale and security from day one.",
  },
  {
    title: "Organizations Burned Before",
    description: "You need a partner willing to put results on the line — with milestone-driven and verified delivery.",
  },
];

const notRightFit = [
  "Simple websites or landing pages",
  "Projects evaluated primarily on hourly rate",
  "Staff augmentation or developer placement",
  "Engagements without clear ownership on the client side",
];

export default function PartnersPage() {
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
              Who We Work With
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight max-w-3xl">
              Selective partnerships
            </h1>
            <p className="text-xl text-white/60 max-w-2xl">
              Deep technology work requires alignment between both parties.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Ideal Partners */}
      <Section background="elevated" className="border-t border-white/[0.06]">
        <Container>
          <FadeIn>
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ideal Partners
              </h2>
              <p className="text-white/60">Here is who we work best with.</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {idealPartners.map((partner, index) => (
              <FadeIn key={partner.title} delay={index * 50}>
                <Card variant="gradient" className="h-full">
                  <div className="w-10 h-10 rounded-lg bg-[#9078AC]/20 flex items-center justify-center mb-4">
                    <span className="text-[#9078AC] font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {partner.title}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {partner.description}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* Not the Right Fit */}
      <Section background="dots">
        <Container size="narrow">
          <FadeIn>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Not the Right Fit
              </h2>
              <p className="text-white/60">We are not the right partner for:</p>
            </div>

            <div className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] rounded-2xl p-6 md:p-8">
              <ul className="space-y-4">
                {notRightFit.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/60">
                    <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-red-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* CTA */}
      <Section background="gradient-purple">
        <Container size="narrow">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Think we might be a fit?
              </h2>
              <p className="text-lg text-white/60 mb-8">
                Let&apos;s have a conversation.
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
