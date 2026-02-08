interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  gradient?: boolean;
  background?: "none" | "subtle" | "elevated" | "dots" | "gradient-purple";
}

export default function Section({
  children,
  className = "",
  id,
  gradient = false,
  background = "none",
}: SectionProps) {
  const backgrounds = {
    none: "",
    subtle: "bg-white/[0.01]",
    elevated: "bg-[#0a0a0a]",
    dots: "",
    "gradient-purple": "",
  };

  return (
    <section
      id={id}
      className={`relative py-20 md:py-28 lg:py-36 ${backgrounds[background]} ${className}`}
    >
      {/* Dot pattern background */}
      {background === "dots" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />
        </div>
      )}

      {/* Purple gradient background */}
      {background === "gradient-purple" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#9078AC]/[0.08] via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(144,120,172,0.15)_0%,transparent_70%)]" />
        </div>
      )}

      {/* Optional gradient glow (legacy support) */}
      {gradient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(144,120,172,0.15)_0%,transparent_70%)]" />
        </div>
      )}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url(/assets/noise-texture.png)', backgroundRepeat: 'repeat' }}
      />

      <div className="relative z-10">{children}</div>
    </section>
  );
}
