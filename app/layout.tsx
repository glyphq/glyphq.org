import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteBackdrop } from "@/components/site-backdrop";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://glyphq.org"),
  title: {
    default: "Glyph | Open-source Qubic ecosystem",
    template: "%s | Glyph",
  },
  description:
    "Glyph is an open-source ecosystem for Qubic: a self-custodial desktop wallet, Connect SDK, Relay, and Explorer.",
  alternates: { canonical: "/" },
  applicationName: "Glyph",
  keywords: [
    "Glyph",
    "Qubic",
    "wallet",
    "self-custody",
    "open source",
    "desktop wallet",
    "Connect",
    "Relay",
  ],
  authors: [{ name: "alez04", url: "https://github.com/alez04" }],
  creator: "alez04",
  openGraph: {
    type: "website",
    url: "https://glyphq.org",
    siteName: "Glyph",
    title: "Glyph | Open-source Qubic ecosystem",
    description:
      "A self-custodial desktop wallet and open-source tools for Qubic.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glyph | Open-source Qubic ecosystem",
    description:
      "A self-custodial desktop wallet and open-source tools for Qubic.",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0a0a0a",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Glyph",
  url: "https://glyphq.org",
  description:
    "An open-source ecosystem for Qubic: a self-custodial desktop wallet, Connect SDK, Relay, and Explorer.",
  publisher: {
    "@type": "Organization",
    name: "Glyph",
    url: "https://glyphq.org",
    logo: "https://glyphq.org/brand/glyph-on-dark.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-dvh bg-background font-sans text-foreground">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script type="application/ld+json">
          {JSON.stringify(structuredData).replace(/</g, "\\u003c")}
        </script>
        <SiteBackdrop />
        <div className="relative z-10 flex min-h-dvh flex-col">
          <a
            href="#main-content"
            className="fixed top-4 left-4 z-[100] -translate-y-24 rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-transform focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
