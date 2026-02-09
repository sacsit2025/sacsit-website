"use client";

import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Section, Container, Button, FadeIn } from "@/components";

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await emailjs.sendForm(
        "service_30mj8rn",
        "template_ujamidd",
        formRef.current!,
        "xBKyWVG997zp35Jyg"
      );
      setStatus("success");
      setFormData({ name: "", company: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
              Contact
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight max-w-3xl">
              Start a Conversation
            </h1>
            <p className="text-xl text-white/60 max-w-2xl">
              All engagements begin with a mutual NDA and a discovery call.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Form */}
      <Section background="elevated" className="border-t border-white/[0.06]">
        <Container size="narrow">
          {status === "success" ? (
            <FadeIn>
              <div className="text-center py-12 bg-gradient-to-br from-[#9078AC]/[0.1] to-white/[0.02] border border-[#9078AC]/20 rounded-2xl p-8 shadow-[0_0_60px_rgba(144,120,172,0.1)]">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Message Sent</h2>
                <p className="text-white/60 mb-8">
                  We will review your message and get back to you shortly.
                </p>
                <Button onClick={() => setStatus("idle")} variant="secondary">
                  Send Another Message
                </Button>
              </div>
            </FadeIn>
          ) : (
            <FadeIn>
              <div className="bg-gradient-to-br from-[#9078AC]/[0.08] to-white/[0.02] border border-[#9078AC]/20 rounded-2xl p-6 md:p-8 shadow-[0_0_60px_rgba(144,120,172,0.08)]">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.15] text-white placeholder-white/40 focus:border-[#9078AC] focus:ring-1 focus:ring-[#9078AC] focus:bg-white/[0.1] outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-white/90 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.15] text-white placeholder-white/40 focus:border-[#9078AC] focus:ring-1 focus:ring-[#9078AC] focus:bg-white/[0.1] outline-none transition-all"
                      placeholder="Your company"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.15] text-white placeholder-white/40 focus:border-[#9078AC] focus:ring-1 focus:ring-[#9078AC] focus:bg-white/[0.1] outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/[0.15] text-white placeholder-white/40 focus:border-[#9078AC] focus:ring-1 focus:ring-[#9078AC] focus:bg-white/[0.1] outline-none transition-all resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                      Something went wrong. Please try again or email us directly.
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? "Sending..." : "Get in Touch"}
                  </Button>
                </form>
              </div>

              <div className="mt-12 pt-12 border-t border-white/[0.06] text-center">
                <p className="text-white/50 mb-2">Prefer email?</p>
                <a
                  href="mailto:info@sacsit.com"
                  className="text-white hover:text-[#9078AC] transition-colors font-medium"
                >
                  info@sacsit.com
                </a>
                <p className="text-white/40 text-sm mt-6">Beirut, Lebanon</p>
              </div>
            </FadeIn>
          )}
        </Container>
      </Section>
    </>
  );
}
