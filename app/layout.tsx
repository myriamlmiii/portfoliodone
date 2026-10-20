import type { Metadata } from "next";
import { Noto_Sans_Arabic } from "next/font/google";
import "@fontsource/bebas-neue/400.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { AICharacter } from "@/components/chat/AICharacter";
import { AmbientBackground } from "@/components/AmbientBackground";
import { PreferencesProvider } from "@/components/Preferences";
import { SITE_URL } from "@/data/site";

const arabic = Noto_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "600", "700"], variable: "--font-arabic" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Meriem Lmoubariki | AI Engineer & Researcher in Morocco",
  description:
    "Meriem Lmoubariki is an AI engineer and researcher based in Morocco, working across applied AI, computational research, and data-intensive systems.",
  keywords: [
    "Meriem Lmoubariki",
    "AI Engineer",
    "Computational Research",
    "Drug Discovery",
    "Morocco",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Meriem Lmoubariki | Builder of Systems",
    description: "AI engineer, researcher, and founder. Building intelligent systems grounded in research.",
    type: "website",
    url: "/",
    siteName: "Meriem Lmoubariki",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meriem Lmoubariki | Builder of Systems",
    description: "AI engineer, researcher, and founder. Building intelligent systems grounded in research.",
  },
};

const bootScript = `
try {
  var t = localStorage.getItem('theme');
  if (t !== 'dark' && t !== 'light') {
    t = 'dark';
  }
  var root = document.documentElement;
  root.dataset.theme = t;
  root.classList.add(t);
  root.style.colorScheme = t;
  var l = localStorage.getItem('locale');
  if (l === 'en' || l === 'fr' || l === 'ar') {
    root.lang = l === 'ar' ? 'ar' : l;
    root.dir = l === 'ar' ? 'rtl' : 'ltr';
  }
} catch (e) {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${arabic.variable}`}
    >
      <head>
        <meta name="theme-color" content="#0c0e0f" />
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="bg-canvas text-ink">
        <PreferencesProvider>
          <LenisProvider>{children}</LenisProvider>
          <AmbientBackground />
          <AICharacter />
        </PreferencesProvider>
      </body>
    </html>
  );
}
