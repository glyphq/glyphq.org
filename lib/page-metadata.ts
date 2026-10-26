import type { Metadata } from "next";

export function pageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | Glyph`,
      description,
      url: path,
      type: "website",
      siteName: "Glyph",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} | Glyph`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Glyph`,
      description,
      images: [image],
    },
  };
}
