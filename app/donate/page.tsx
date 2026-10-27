import { DonationExperience } from "@/components/donation-experience";
import { donationConfig, getDonationSnapshot } from "@/lib/donations";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  title: "Donate",
  description:
    "Support Glyph with ETH, POL, USDC, USDT, SOL, or QU. See USDT and USDC balances and what has been donated so far.",
  path: "/donate",
});

export default async function DonatePage() {
  const snapshot = await getDonationSnapshot();

  return (
    <DonationExperience
      evmAddress={donationConfig.evmAddress}
      qubicIdentity={donationConfig.qubicIdentity}
      solanaAddress={donationConfig.solanaAddress}
      evmBalances={snapshot.evm}
      solanaBalance={snapshot.solana}
      qubicBalance={snapshot.qubic}
      evmStablecoins={snapshot.evmStablecoins}
      solanaStablecoins={snapshot.solanaStablecoins}
      usdcTotal={snapshot.usdcTotal}
      usdtTotal={snapshot.usdtTotal}
      donatedStablecoins={snapshot.donatedStablecoins}
    />
  );
}
