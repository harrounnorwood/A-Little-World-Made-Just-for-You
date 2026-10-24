import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Everglow — A birthday gift",
  description: "A little interactive world made just for you.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
