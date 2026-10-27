import { connection } from "next/server";
import { getDonationSnapshot } from "@/lib/donations";

export async function GET() {
  await connection();

  const snapshot = await getDonationSnapshot();

  return Response.json(snapshot, {
    headers: {
      "cache-control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
