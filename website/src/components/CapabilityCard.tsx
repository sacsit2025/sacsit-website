"use client";

import { useState } from "react";

interface CapabilityCardProps {
  title: string;
  tagline: string;
  items: string[];
  icon: React.ReactNode;
  accent?: string;
  size?: "default" | "wide" | "tall";
}

export default function CapabilityCard({
  title,
  tagline,
  items,
  icon,
  accent = "#9078AC",
  size = "default",
}: CapabilityCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative overflow-hidden rounded-2xl transition-all duration-500 ease-out
        ${size === "wide" ? "md:col-span-2" : ""}
        ${size === "tall" ? "md:row-span-2" : ""}
      `}
      style={{
        border: `1px solid ${isHovered ? accent + "70" : accent + "35"}`,
        background: `linear-gradient(145deg, ${accent}0A 0%, #0A0A0A 40%, ${accent}06 100%)`,
        boxShadow: isHovered
          ? `0 0 40px ${accent}15, inset 0 1px 0 ${accent}20`
          : `inset 0 1px 0 ${accent}10`,
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accent} 50%, transparent 100%)`,
          opacity: isHovered ? 0.8 : 0.35,
          transition: "opacity 0.5s ease",
        }}
      />

      {/* Large glow orb */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle, ${accent}18 0%, ${accent}08 40%, transparent 70%)`,
          opacity: isHovered ? 1 : 0.4,
        }}
      />

      {/* Bottom corner glow */}
      <div
        className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full pointer-events-none transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle, ${accent}10 0%, transparent 60%)`,
          opacity: isHovered ? 0.8 : 0.2,
        }}
      />

      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
          style={{
            background: `linear-gradient(135deg, ${accent}30 0%, ${accent}12 100%)`,
            border: `1px solid ${accent}35`,
            boxShadow: isHovered ? `0 0 20px ${accent}25` : "none",
          }}
        >
          <div style={{ color: accent }} className="w-6 h-6">
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-lg md:text-xl font-semibold mb-2 tracking-tight transition-colors duration-300"
          style={{ color: isHovered ? accent : "#FFFFFF" }}
        >
          {title}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-white/45 mb-6 leading-relaxed">
          {tagline}
        </p>

        {/* Capability tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {items.map((item, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-300"
              style={{
                background: `${accent}10`,
                color: `${accent}CC`,
                border: `1px solid ${accent}20`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${accent}22`;
                e.currentTarget.style.borderColor = `${accent}40`;
                e.currentTarget.style.color = accent;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = `${accent}10`;
                e.currentTarget.style.borderColor = `${accent}20`;
                e.currentTarget.style.color = `${accent}CC`;
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
