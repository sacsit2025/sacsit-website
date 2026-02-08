interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  variant?: "default" | "elevated" | "bordered" | "gradient";
}

export default function Card({
  children,
  className = "",
  hover = true,
  glow = false,
  variant = "default",
}: CardProps) {
  const variants = {
    default: `
      bg-white/[0.03] border border-white/[0.08]
      ${hover ? "hover:bg-white/[0.06] hover:border-white/[0.15]" : ""}
    `,
    elevated: `
      bg-[#0a0a0a] border border-white/[0.08]
      shadow-[0_4px_24px_rgba(0,0,0,0.4)]
      ${hover ? "hover:bg-[#111] hover:border-white/[0.12] hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)]" : ""}
    `,
    bordered: `
      bg-transparent border border-white/[0.1]
      ${hover ? "hover:border-[#9078AC]/50 hover:shadow-[0_0_30px_rgba(144,120,172,0.1)]" : ""}
    `,
    gradient: `
      bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08]
      ${hover ? "hover:from-white/[0.08] hover:to-white/[0.04] hover:border-white/[0.15]" : ""}
    `,
  };

  return (
    <div
      className={`
        relative rounded-2xl p-6 md:p-8
        ${variants[variant]}
        ${glow ? "shadow-[0_0_60px_rgba(144,120,172,0.2)]" : ""}
        ${hover ? "transition-all duration-300" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
