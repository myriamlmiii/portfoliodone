import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meriem Lmoubariki — Building what matters next",
  description: "Meriem Lmoubariki is a full stack engineer, AI engineer, data scientist, researcher and product builder based in Morocco.",
  keywords: ["Meriem Lmoubariki", "Full Stack Engineer Morocco", "AI Engineer", "Data Scientist", "Researcher", "Product Builder"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
