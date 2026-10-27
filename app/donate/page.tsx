import { DonationExperience } from "@/components/donation-experience";
import { donationConfig, getDonationSnapshot } from "@/lib/donations";
import { pageMetadata } from "@/lib/page-metadata";
import { getDonationQrCodes } from "@/lib/qr";

export const metadata = pageMetadata({
  title: "Donate",
  description:
    "Support Glyph with ETH, POL, USDC, USDT, SOL, or QU. See USDT and USDC balances and what has been donated so far.",
  path: "/donate",
});

export default async function DonatePage() {
  const snapshot = await getDonationSnapshot();
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
      evmBalances={snapshot.evm}
      solanaBalance={snapshot.solana}
      qubicBalance={snapshot.qubic}
      evmStablecoins={snapshot.evmStablecoins}
      solanaStablecoins={snapshot.solanaStablecoins}
      usdcTotal={snapshot.usdcTotal}
      usdtTotal={snapshot.usdtTotal}
      donatedUsd={snapshot.donatedUsd}
    />
  );
}
