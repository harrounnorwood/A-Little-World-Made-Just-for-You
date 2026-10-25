import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A Birthday Gift for Jeriel Mae G. Olvina",
  description: "A little interactive birthday surprise made with love for Jeriel Mae G. Olvina.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
