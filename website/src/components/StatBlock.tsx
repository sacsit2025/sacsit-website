interface StatBlockProps {
  value: string;
  label: string;
  className?: string;
}

export default function StatBlock({ value, label, className = "" }: StatBlockProps) {
  return (
    <div className={`text-center ${className}`}>
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-tight">
        {value}
      </div>
      <div className="text-sm text-white/40 uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
