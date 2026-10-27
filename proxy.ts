import { type NextRequest, NextResponse } from "next/server";

// Link preview crawlers are treated as HTML-limited bots by Next.js. On the
// Cloudflare adapter, that render path fails and social platforms never see
// the page metadata. Normalize only those crawlers so they receive the static
// HTML that already contains the Open Graph tags.
const linkPreviewBot =
  /Twitterbot|facebookexternalhit|Discordbot|LinkedInBot|Slackbot|TelegramBot|WhatsApp|SkypeUriPreview|redditbot|tumblr|vkShare|quora link preview|bitlybot/i;

export function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";

  if (!linkPreviewBot.test(userAgent)) {
    return NextResponse.next();
  }

  const headers = new Headers(request.headers);
  headers.set("user-agent", "Mozilla/5.0 (compatible; GlyphLinkPreview/1.0)");

  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
