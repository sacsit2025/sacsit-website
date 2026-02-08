import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | SACS-IT",
  description: "Start a conversation with SACS-IT. All engagements begin with a mutual NDA and a discovery call.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
