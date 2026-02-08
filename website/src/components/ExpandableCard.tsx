"use client";

import { useState } from "react";

interface ExpandableCardProps {
  title: string;
  items: string[];
  icon?: React.ReactNode;
  defaultOpen?: boolean;
}

export default function ExpandableCard({
  title,
  items,
  icon,
  defaultOpen = false,
}: ExpandableCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className={`
        border rounded-xl overflow-hidden transition-all duration-300
        ${isOpen
          ? "border-[#9078AC]/30 bg-gradient-to-br from-[#9078AC]/[0.08] to-transparent shadow-[0_0_40px_rgba(144,120,172,0.1)]"
          : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]"
        }
      `}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors"
      >
        <div className="flex items-center gap-4">
          {icon && (
            <div className="w-10 h-10 rounded-lg bg-[#9078AC]/10 flex items-center justify-center text-[#9078AC]">
              {icon}
            </div>
          )}
          <h3 className={`text-base md:text-lg font-medium transition-colors ${isOpen ? "text-white" : "text-white/80"}`}>
            {title}
          </h3>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-[#9078AC]/20" : "bg-white/[0.05]"}`}>
          <svg
            className={`w-4 h-4 transition-transform duration-300 ${
              isOpen ? "rotate-180 text-[#9078AC]" : "text-white/40"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-6 pb-6 pt-2 space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-white/60 text-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#9078AC] mt-2 flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
