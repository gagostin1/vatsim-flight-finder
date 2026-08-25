import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VATSIM Flight Finder",
  description: "Find a VATSIM flight that fits your time, traffic, and ATC preferences.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
