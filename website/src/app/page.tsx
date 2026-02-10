"use client";

import Image from "next/image";
import { Button, Section, Container, Card, StatBlock, FadeIn } from "@/components";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grainy gradient background */}
          <Image
            src="/assets/hero-bg.jpg"
            alt=""
            fill
            className="object-cover opacity-50"
            priority
          />
          {/* Dark overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />
          {/* Purple glow - top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(144,120,172,0.25)_0%,transparent_70%)]" />
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url(/assets/noise-texture.png)', backgroundRepeat: 'repeat' }} />
        </div>

        {/* 3D Glass Shape - Decorative */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] opacity-70 pointer-events-none hidden lg:block">
          <Image
            src="/assets/glass-shape-1.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <Container className="relative z-10 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <Image
                src="/logo-dark.png"
                alt="SACS-IT"
                width={160}
                height={54}
                className="mx-auto mb-8"
                priority
              />
            </FadeIn>

            <FadeIn delay={100}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                We Build Platforms
                <br />
                <span className="gradient-text">That Work.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
                Enterprise-grade technology platforms — from architecture to production.
                Backed by 25 years of engineering depth and independently verified delivery.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button href="/contact" variant="primary" size="lg">
                  Start a Conversation
                </Button>
                <Button href="/capabilities" variant="secondary" size="lg">
                  View Capabilities
                </Button>
              </div>
            </FadeIn>
          </div>
        </Container>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* What We Do Section */}
      <Section background="elevated" className="border-t border-white/[0.06]">
        <Container>
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-sm text-[#9078AC] font-medium uppercase tracking-widest mb-4">
                What We Do
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Three core capabilities
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            <FadeIn delay={100}>
              <Card variant="gradient" className="h-full">
                <div className="w-12 h-12 mb-6 rounded-xl bg-[#9078AC]/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#9078AC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Platform Development
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Complete SaaS and enterprise platforms, from database architecture to user interface. Production-grade.
                </p>
              </Card>
            </FadeIn>

            <FadeIn delay={200}>
              <Card variant="gradient" className="h-full">
                <div className="w-12 h-12 mb-6 rounded-xl bg-[#9078AC]/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#9078AC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Industrial Automation
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Unified industrial systems replacing SCADA, MES, CMMS, and ERP. Built from 16 years of field experience.
                </p>
              </Card>
            </FadeIn>

            <FadeIn delay={300}>
              <Card variant="gradient" className="h-full">
                <div className="w-12 h-12 mb-6 rounded-xl bg-[#9078AC]/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#9078AC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  AI Infrastructure
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Intelligent agents, voice interaction systems, and multi-provider AI orchestration. Deployed in production.
                </p>
              </Card>
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* The Foundation Section */}
      <Section background="dots">
        <Container size="narrow">
          <FadeIn>
            <div className="text-center">
              <p className="text-sm text-[#9078AC] font-medium uppercase tracking-widest mb-4">
                The Foundation
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                Built on 7 years of R&D
              </h2>
              <p className="text-lg text-white/50 leading-relaxed mb-6">
                Our current capabilities are the direct result of building two enterprise
                platforms from the ground up — a real-time industrial operating system and a
                full-stack application framework.
              </p>
              <p className="text-lg text-white/70 font-medium">
                <span className="gradient-text">We built the engines that power the code.</span>
              </p>
            </div>
          </FadeIn>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section background="elevated" className="border-t border-b border-white/[0.06]">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <FadeIn delay={0}>
              <StatBlock value="25" label="Years" />
            </FadeIn>
            <FadeIn delay={100}>
              <StatBlock value="6" label="Countries" />
            </FadeIn>
            <FadeIn delay={200}>
              <StatBlock value="7" label="Years R&D" />
            </FadeIn>
            <FadeIn delay={300}>
              <StatBlock value="2" label="Frameworks" />
            </FadeIn>
          </div>
        </Container>
      </Section>

      {/* How We Deliver Section */}
      <Section background="gradient-purple">
        <Container size="narrow">
          <FadeIn>
            <div className="text-center">
              <p className="text-sm text-[#9078AC] font-medium uppercase tracking-widest mb-4">
                How We Deliver
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Results-secured delivery
              </h2>
              <p className="text-lg text-white/50 mb-8 leading-relaxed">
                Milestone-driven. Working software at every checkpoint. With an option for
                independently verified delivery — every milestone certified by a third-party
                consultant before payment release.
              </p>
              <Button href="/engagement" variant="secondary">
                See Our Engagement Model
              </Button>
            </div>
          </FadeIn>
        </Container>
      </Section>
    </>
  );
}
