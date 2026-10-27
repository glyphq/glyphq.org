import { cacheLife } from "next/cache";
import QRCode from "qrcode";

function donationQr(value: string) {
  return QRCode.toDataURL(value, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 256,
    color: {
      dark: "#0a0a0a",
      light: "#f8f7f2",
    },
  });
}

export async function getDonationQrCodes({
  evmAddress,
  solanaAddress,
  qubicIdentity,
}: {
  evmAddress: string;
  solanaAddress: string;
  qubicIdentity: string;
}) {
  "use cache";
  cacheLife("max");

  const [evmQr, solanaQr, qubicQr] = await Promise.all([
    donationQr(evmAddress),
    donationQr(solanaAddress),
    donationQr(qubicIdentity),
  ]);

  return { evmQr, solanaQr, qubicQr };
}
