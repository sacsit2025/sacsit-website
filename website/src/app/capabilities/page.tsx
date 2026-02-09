import type { Metadata } from "next";
import { Container, FadeIn } from "@/components";
import CapabilityCard from "@/components/CapabilityCard";

export const metadata: Metadata = {
  title: "Capabilities | SACS-IT",
  description: "Full-stack platform development, AI infrastructure, industrial automation, and more. All capabilities demonstrated in production.",
};

const capabilities = [
  {
    title: "Platform Architecture",
    tagline: "Cloud-native backends built for scale, security, and real-time data flow.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 7h16M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7M4 7l4-4h8l4 4" />
        <path d="M8 12h.01M12 12h.01M16 12h.01" />
      </svg>
    ),
    items: [
      "Row-level security",
      "Multi-tenant isolation",
      "Real-time subscriptions",
      "Edge functions",
      "Multi-provider auth",
      "Auto-generated APIs",
      "Webhook processing",
    ],
    size: "default" as const,
    accent: "#9078AC",
  },
  {
    title: "Cloud & Security",
    tagline: "Enterprise-grade infrastructure with automated compliance and uptime guarantees.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    items: [
      "SOC 2 Type II",
      "GDPR & ISO 27001",
      "99.9%+ uptime SLA",
      "End-to-end encryption",
      "Auto-scaling",
      "Automated backups",
    ],
    size: "default" as const,
    accent: "#7B9EAC",
  },
  {
    title: "Web & Mobile",
    tagline: "Cross-platform apps with offline-first architecture and native performance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    items: [
      "SSR & reactive web",
      "Single codebase mobile",
      "Offline-first sync",
      "Push notifications",
      "PWA support",
    ],
    size: "default" as const,
    accent: "#AC7890",
  },
  {
    title: "AI Infrastructure & Agents",
    tagline: "Multi-provider AI pipelines with real-time voice, streaming, and per-tenant controls.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 014 4v2a4 4 0 01-8 0V6a4 4 0 014-4z" />
        <path d="M9 22h6" />
        <path d="M12 18v4" />
        <path d="M6 12a6 6 0 0012 0" />
      </svg>
    ),
    items: [
      "Speech-to-text & TTS",
      "LLM integration",
      "Real-time voice + VAD",
      "Agent workflows",
      "Per-tenant AI config",
      "Rate limiting & analytics",
    ],
    size: "default" as const,
    accent: "#AC9878",
  },
  {
    title: "Industrial Automation & IoT",
    tagline: "Unified platform replacing SCADA, MES, CMMS, and ERP with real-time device integration.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    items: [
      "Replaces SCADA / MES / CMMS / ERP",
      "Real-time database engine",
      "Native PLC drivers",
      "IoT device integration",
      "No-code dashboards",
    ],
    size: "default" as const,
    accent: "#8CAC78",
  },
  {
    title: "Marketplace & Networks",
    tagline: "Multi-sided platforms with booking engines and partner lifecycle management.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
    items: [
      "Multi-sided architecture",
      "Booking & reservations",
      "Partner onboarding",
      "Multi-geography coordination",
    ],
    size: "default" as const,
    accent: "#7878AC",
  },
  {
    title: "CRM & Analytics",
    tagline: "Behavioral segmentation, automated campaigns, and real-time reporting across entities.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    items: [
      "Behavioral segmentation",
      "Automated campaigns",
      "Group-level analytics",
      "POS integration",
      "Payment gateways",
    ],
    size: "default" as const,
    accent: "#AC78AC",
  },
  {
    title: "Communications",
    tagline: "Multi-channel delivery with per-channel tracking and template engines.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    items: [
      "SMS (local + international)",
      "Email infrastructure",
      "Template engines",
      "Delivery tracking",
    ],
    size: "default" as const,
    accent: "#78ACAC",
  },
  {
    title: "Internationalization",
    tagline: "9 languages with native RTL support and culturally adapted experiences.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8l6 6M4 14l6-6 2 2" />
        <path d="M2 5h12M7 2v3" />
        <path d="M22 22l-5-10-5 10M14 18h6" />
      </svg>
    ),
    items: [
      "9 languages",
      "Native RTL support",
      "Translation-ready data",
      "Per-tenant locale",
      "Culturally adapted UX",
    ],
    size: "default" as const,
    accent: "#AC7878",
  },
];

export default function CapabilitiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(144,120,172,0.15)_0%,transparent_70%)]" />
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url(/assets/noise-texture.png)', backgroundRepeat: 'repeat' }} />
        </div>
        <Container className="relative z-10">
          <FadeIn>
            <p className="text-sm text-[#9078AC] font-medium uppercase tracking-widest mb-4">
              What we build
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight max-w-3xl">
              Everything ships to{" "}
              <span className="text-[#9078AC]">production</span>
            </h1>
            <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
              Every capability listed here has been architected, built, and deployed in real production environments. No prototypes. No proofs of concept.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Capabilities Grid */}
      <section className="relative pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((capability, index) => (
              <FadeIn key={capability.title} delay={index * 50}>
                <CapabilityCard
                  title={capability.title}
                  tagline={capability.tagline}
                  items={capability.items}
                  icon={capability.icon}
                  accent={capability.accent}
                  size={capability.size}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
