import Image from "next/image";
import type { Metadata } from "next";
import { Section, Container, Card, FadeIn } from "@/components";

export const metadata: Metadata = {
  title: "Story | SACS-IT",
  description: "25 years of engineering depth. From industrial automation across 6 countries to enterprise platform development.",
};

const industrialProjects = [
  {
    category: "Oil & Gas",
    description: "SCADA and safety systems for DEWA (Dubai), Banias Refinery (Syria), Dijla Petroleum, Al Furat Petroleum",
    image: "/assets/industrial-control-room.jpg",
  },
  {
    category: "Water & Infrastructure",
    description: "PLC/SCADA for Degremont–Suez, Subal, OTV–Veolia across Lebanon and Algeria",
    image: "/assets/industrial-control-panel.jpg",
  },
  {
    category: "FMCG & Manufacturing",
    description: "Aujan Industries (Dubai), Procter & Gamble standards, batch control systems",
    image: "/assets/industrial-manufacturing.jpg",
  },
  {
    category: "HVAC & Building",
    description: "JBR Dubai (25 towers, 12,000 fan coils, 150 AHUs), commissioned with APAVE",
    image: "/assets/industrial-hvac.jpg",
  },
  {
    category: "Energy Management",
    description: "Four Seasons, Movenpick hotels — load-sharing and optimization systems",
    image: "/assets/industrial-energy.jpg",
  },
];

export default function StoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(144,120,172,0.2)_0%,transparent_70%)]" />
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url(/assets/noise-texture.png)', backgroundRepeat: 'repeat' }} />
        </div>

        {/* 3D Glass Shape - Decorative */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 w-[500px] h-[500px] opacity-60 pointer-events-none hidden lg:block">
          <Image
            src="/assets/glass-shape-2.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <Container className="relative z-10">
          <FadeIn>
            <p className="text-sm text-[#9078AC] font-medium uppercase tracking-widest mb-4">
              Our Story
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight max-w-3xl">
              From mission-critical systems to enterprise platforms
            </h1>
            <p className="text-xl text-white/60 max-w-2xl">
              A foundation built on zero tolerance for failure.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Founder Section */}
      <Section background="elevated" className="border-t border-white/[0.06]">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <FadeIn className="md:col-span-1">
              <div className="aspect-video relative overflow-hidden rounded-2xl border border-white/[0.08]">
                <img
                  src="/assets/server-infrastructure.jpg"
                  alt="Server infrastructure and network cabling"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </FadeIn>
            <FadeIn delay={100} className="md:col-span-1">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Our Story
              </h2>
              <p className="text-[#9078AC] font-medium mb-6">
                Engineering · Architecture · Operations
              </p>
              <p className="text-lg text-white/60 leading-relaxed">
                SACS-IT was founded in 2016 by Karim Gilbert Saikali, a systems engineer with
                25 years of experience in industrial automation, enterprise software architecture,
                and SaaS product development. The discipline of building systems that cannot fail
                drives every platform we deliver.
              </p>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Industrial Engineering */}
      <Section background="dots">
        <Container>
          <FadeIn>
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Industrial Engineering
              </h2>
              <p className="text-lg text-white/50 max-w-3xl">
                16 years delivering mission-critical systems across 6 countries in the MENA region.
                Every project required zero tolerance for failure.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industrialProjects.map((project, index) => (
              <FadeIn key={project.category} delay={index * 50}>
                <Card variant="bordered" hover={true} className="h-full overflow-hidden !p-0">
                  <div className="relative h-40 w-full">
                    <Image
                      src={project.image}
                      alt={project.category}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-white mb-2">
                      {project.category}
                    </h3>
                    <p className="text-sm text-white/50">
                      {project.description}
                    </p>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>

      {/* Platform R&D */}
      <Section background="elevated" className="border-t border-white/[0.06]">
        <Container>
          <FadeIn>
            <div className="mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Platform R&D
              </h2>
              <p className="text-lg text-white/50 max-w-3xl">
                We designed and built two enterprise-grade technology platforms from the ground up —
                the kind of systems typically built by large corporations with dedicated engineering divisions.
              </p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            <FadeIn delay={100}>
              <Card variant="gradient" glow className="h-full">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src="/sop-logo.png"
                    alt="SOP Platform"
                    width={120}
                    height={120}
                    className="w-20 h-20 md:w-[120px] md:h-[120px] object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">SOP Platform</h3>
                    <p className="text-sm text-white/50">Industry 4.0 Operating System</p>
                  </div>
                </div>
                <p className="text-white/60 text-sm mb-4">
                  A complete industrial platform replacing separate SCADA, MES, CMMS, and ERP systems.
                </p>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-start gap-2">
                    <span className="text-[#9078AC]">·</span>
                    Proprietary real-time database engine
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9078AC]">·</span>
                    Native PLC drivers and IoT infrastructure
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9078AC]">·</span>
                    No-code dashboard builder
                  </li>
                </ul>
              </Card>
            </FadeIn>

            <FadeIn delay={200}>
              <Card variant="gradient" glow className="h-full">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    src="/petal-logo.png"
                    alt="Petal.io"
                    width={120}
                    height={120}
                    className="w-20 h-20 md:w-[120px] md:h-[120px] object-contain"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">Petal.io</h3>
                    <p className="text-sm text-white/50">Enterprise Development Framework</p>
                  </div>
                </div>
                <p className="text-white/60 text-sm mb-4">
                  Eliminating repetitive infrastructure work so teams focus on business logic.
                </p>
                <ul className="space-y-2 text-sm text-white/50">
                  <li className="flex items-start gap-2">
                    <span className="text-[#9078AC]">·</span>
                    Domain-driven database architecture
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9078AC]">·</span>
                    Real-time sync with offline-first capability
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9078AC]">·</span>
                    Built-in security and audit trails
                  </li>
                </ul>
              </Card>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* Today */}
      <Section background="gradient-purple">
        <Container size="narrow">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Production-Proven Delivery
              </h2>
              <p className="text-lg text-white/60">
                We have delivered multiple production platforms in parallel
                across hospitality, marketplace, event management, and AI infrastructure domains.
                All capabilities described on this site have been demonstrated in production.
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
