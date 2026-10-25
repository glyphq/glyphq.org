import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delay={200}>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
