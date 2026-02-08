import Link from "next/link";
import Image from "next/image";

const footerLinks = [
  { href: "/story", label: "Story" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/engagement", label: "Engagement" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Logo & Info */}
          <div>
            <Image
              src="/logo-dark.png"
              alt="SACS-IT"
              width={100}
              height={33}
              className="h-6 w-auto mb-4"
            />
            <p className="text-white/40 text-sm">
              Results-Secured Technology Studio
            </p>
            <p className="text-white/30 text-sm mt-1">
              Beirut, Lebanon
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/40 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-white/30 text-sm text-center">
            &copy; {new Date().getFullYear()} SACS-IT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
