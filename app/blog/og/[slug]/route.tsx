import { createOgImage } from "@/lib/og-image";
import { getPost } from "@/lib/posts";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  return createOgImage({
    title: post.title,
    description: post.description,
  });
}
