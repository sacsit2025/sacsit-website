import type { Metadata } from "next";
import { Section, Container, ExpandableCard, FadeIn } from "@/components";

export const metadata: Metadata = {
  title: "Capabilities | SACS-IT",
  description: "Full-stack platform development, AI infrastructure, industrial automation, and more. All capabilities demonstrated in production.",
};

const capabilities = [
  {
    title: "Platform Architecture & Backend",
    items: [
      "Cloud-native relational database with row-level security and per-tenant data isolation",
      "Real-time data subscriptions, event-driven triggers, and serverless edge functions",
      "Built-in authentication with multi-provider support (social, email, phone, SSO)",
      "Auto-generated REST and real-time APIs from database schema",
      "Webhook-driven event processing and third-party service integration",
    ],
  },
  {
    title: "Cloud Infrastructure & Security",
    items: [
      "Enterprise-grade cloud infrastructure with auto-scaling",
      "SOC 2 Type II, GDPR, ISO 27001 certified infrastructure",
      "99.9%+ uptime SLA with automated failover",
      "End-to-end encryption: TLS in transit, AES-256 at rest",
      "Automated backups with point-in-time recovery",
    ],
  },
  {
    title: "Web & Mobile Development",
    items: [
      "Reactive web architecture with server-side rendering",
      "Cross-platform mobile apps from a single codebase",
      "Offline-first mobile architecture with background sync",
      "Push notification infrastructure",
      "Progressive Web App (PWA) capabilities",
    ],
  },
  {
    title: "AI Infrastructure & Agents",
    items: [
      "Multi-provider AI integration (speech-to-text, text-to-speech, LLM)",
      "Real-time voice interaction with VAD and streaming",
      "Webhook-driven AI agent logic with configurable workflows",
      "Per-tenant AI credentials, rate limiting, and analytics",
    ],
  },
  {
    title: "Industrial Automation & IoT",
    items: [
      "Unified platform replacing SCADA, MES, CMMS, and ERP",
      "Proprietary real-time database engine",
      "Native PLC drivers and IoT device integration",
      "No-code operational dashboards",
    ],
  },
  {
    title: "Marketplace & Networks",
    items: [
      "Multi-sided marketplace architecture",
      "Booking and reservation engine with real-time availability",
      "Partner onboarding and lifecycle management",
      "Multi-geography network coordination",
    ],
  },
  {
    title: "CRM & Analytics",
    items: [
      "Behavioral segmentation with automated campaigns",
      "Multi-entity group-level analytics and reporting",
      "Real-time POS and hardware integration",
      "Payment gateway integration",
    ],
  },
  {
    title: "Multi-Channel Communication",
    items: [
      "SMS delivery via local and international providers",
      "Email delivery infrastructure with template engines",
      "Per-channel delivery tracking and analytics",
    ],
  },
  {
    title: "Internationalization",
    items: [
      "Multi-language support (9 languages) with native RTL",
      "Translation-ready data architecture",
      "Per-tenant locale configuration",
      "Culturally adapted UX per market",
    ],
  },
];

export default function CapabilitiesPage() {
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
              Capabilities
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight max-w-3xl">
              Production-proven capabilities
            </h1>
            <p className="text-xl text-white/60 max-w-2xl">
              All capabilities listed below have been demonstrated in production environments.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Capabilities List */}
      <Section background="elevated" className="border-t border-white/[0.06]">
        <Container>
          <div className="space-y-3">
            {capabilities.map((capability, index) => (
              <FadeIn key={capability.title} delay={index * 30}>
                <ExpandableCard
                  title={capability.title}
                  items={capability.items}
                  defaultOpen={index === 0}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
