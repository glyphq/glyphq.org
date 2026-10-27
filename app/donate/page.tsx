import { DonationExperience } from "@/components/donate/experience";
import { donationConfig } from "@/lib/donations";
import { pageMetadata } from "@/lib/page-metadata";
import { getDonationQrCodes } from "@/lib/qr";

export const metadata = pageMetadata({
  title: "Donate",
  description:
    "Support Glyph with USDC, USDT, or QU. See stablecoin balances and what has been donated so far.",
  path: "/donate",
});

export default async function DonatePage() {
  const { evmQr, solanaQr, qubicQr } = await getDonationQrCodes({
    evmAddress: donationConfig.evmAddress,
    solanaAddress: donationConfig.solanaAddress,
    qubicIdentity: donationConfig.qubicIdentity,
  });

  return (
    <DonationExperience
      evmAddress={donationConfig.evmAddress}
      qubicIdentity={donationConfig.qubicIdentity}
      solanaAddress={donationConfig.solanaAddress}
      evmQr={evmQr}
      solanaQr={solanaQr}
      qubicQr={qubicQr}
    />
  );
}
