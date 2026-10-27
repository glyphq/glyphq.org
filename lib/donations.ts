import { cacheLife } from "next/cache";

export const donationConfig = {
  evmAddress: "0xbe663600d2a0d9c32f28f5cc0649452584986ad4",
  qubicIdentity: "XIKAQZMFGQSALEMMJRATPPRESWTBXQVCOHTHCZWDGFXVBMCAHBCRUICFOQBI",
};

type EvmToken = {
  symbol: string;
  address: `0x${string}`;
  decimals: number;
};

export type EvmChain = {
  id: "ethereum" | "base" | "polygon" | "arbitrum" | "optimism";
  name: string;
  icon: string;
  rpcUrl: string;
  explorerAddress: string;
  tokens: EvmToken[];
};

const USDC_DECIMALS = 6;
const USDT_DECIMALS = 6;

export const evmChains: EvmChain[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    icon: "/chains/ethereum.svg",
    rpcUrl: "https://ethereum-rpc.publicnode.com",
    explorerAddress: "https://etherscan.io/address",
    tokens: [
      {
        symbol: "USDC",
        address: "0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        decimals: USDC_DECIMALS,
      },
      {
        symbol: "USDT",
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        decimals: USDT_DECIMALS,
      },
    ],
  },
  {
    id: "base",
    name: "Base",
    icon: "/chains/base.svg",
    rpcUrl: "https://base-rpc.publicnode.com",
    explorerAddress: "https://basescan.org/address",
    tokens: [
      {
        symbol: "USDC",
        address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        decimals: USDC_DECIMALS,
      },
      {
        symbol: "USDT",
        address: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
        decimals: USDT_DECIMALS,
      },
    ],
  },
  {
    id: "polygon",
    name: "Polygon",
    icon: "/chains/polygon.svg",
    rpcUrl: "https://polygon-bor-rpc.publicnode.com",
    explorerAddress: "https://polygonscan.com/address",
    tokens: [
      {
        symbol: "USDC",
        address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
        decimals: USDC_DECIMALS,
      },
      {
        symbol: "USDT",
        address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
        decimals: USDT_DECIMALS,
      },
    ],
  },
  {
    id: "arbitrum",
    name: "Arbitrum",
    icon: "/chains/arbitrum.svg",
    rpcUrl: "https://arbitrum-one-rpc.publicnode.com",
    explorerAddress: "https://arbiscan.io/address",
    tokens: [
      {
        symbol: "USDC",
        address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
        decimals: USDC_DECIMALS,
      },
      {
        symbol: "USDT",
        address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
        decimals: USDT_DECIMALS,
      },
    ],
  },
  {
    id: "optimism",
    name: "Optimism",
    icon: "/chains/optimism.svg",
    rpcUrl: "https://optimism-rpc.publicnode.com",
    explorerAddress: "https://optimistic.etherscan.io/address",
    tokens: [
      {
        symbol: "USDC",
        address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
        decimals: USDC_DECIMALS,
      },
      {
        symbol: "USDT",
        address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
        decimals: USDT_DECIMALS,
      },
    ],
  },
];

export type TokenBalance = {
  symbol: string;
  formatted: string;
  amount: number;
};

export type ChainBalance = {
  chain: EvmChain;
  tokens: TokenBalance[];
  error?: boolean;
};

export type QubicBalance = {
  formatted: string;
  error?: boolean;
};

async function evmRpc(
  rpcUrl: string,
  method: string,
  params: unknown[],
): Promise<string> {
  const response = await fetch(rpcUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    }),
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    throw new Error(`RPC failed with ${response.status}`);
  }

  const payload = (await response.json()) as {
    result?: string;
    error?: { message?: string };
  };

  if (payload.error || typeof payload.result !== "string") {
    throw new Error(payload.error?.message ?? "RPC returned no result");
  }

  return payload.result;
}

function formatUnits(
  value: string,
  decimals: number,
  maxFractionDigits: number,
) {
  const raw = BigInt(value);
  const divisor = BigInt(10) ** BigInt(decimals);
  const whole = raw / divisor;
  const fraction = raw % divisor;
  const fractionText = fraction
    .toString()
    .padStart(decimals, "0")
    .slice(0, maxFractionDigits)
    .replace(/0+$/, "");

  const wholeText = whole.toLocaleString("en-US");

  if (fractionText) return `${wholeText}.${fractionText}`;
  return maxFractionDigits > 0
    ? `${wholeText}.${"0".repeat(maxFractionDigits)}`
    : wholeText;
}

function formatQubic(value: string) {
  return BigInt(value).toLocaleString("en-US");
}

async function getTokenBalance(
  rpcUrl: string,
  address: string,
  token: EvmToken,
) {
  const data = `0x70a08231${address
    .toLowerCase()
    .replace(/^0x/, "")
    .padStart(64, "0")}`;
  const result = await evmRpc(rpcUrl, "eth_call", [
    { to: token.address, data },
    "latest",
  ]);

  return {
    symbol: token.symbol,
    formatted: formatUnits(result, token.decimals, 2),
    amount: Number(result) / 10 ** token.decimals,
  };
}

async function getEvmChainBalance(chain: EvmChain): Promise<ChainBalance> {
  try {
    const tokenResults = await Promise.allSettled(
      chain.tokens.map((token) =>
        getTokenBalance(chain.rpcUrl, donationConfig.evmAddress, token),
      ),
    );

    const tokens = tokenResults
      .filter(
        (
          result,
        ): result is PromiseFulfilledResult<{
          symbol: string;
          formatted: string;
          amount: number;
        }> => result.status === "fulfilled",
      )
      .map((result) => result.value);

    return {
      chain,
      tokens,
      ...(tokens.length === 0 ? { error: true } : {}),
    };
  } catch {
    return {
      chain,
      tokens: [],
      error: true,
    };
  }
}

async function getQubicBalance(): Promise<QubicBalance> {
  try {
    const response = await fetch(
      `https://rpc.qubic.org/v1/balances/${donationConfig.qubicIdentity}`,
      { signal: AbortSignal.timeout(8_000) },
    );

    if (!response.ok) throw new Error("Qubic RPC failed");

    const payload = (await response.json()) as {
      balance?: { balance?: string };
    };
    const value = payload.balance?.balance;

    if (!value) throw new Error("Qubic balance missing");

    return { formatted: formatQubic(value) };
  } catch {
    return { formatted: "0", error: true };
  }
}

export async function getDonationSnapshot() {
  "use cache";
  cacheLife("minutes");

  const [evm, qubic] = await Promise.all([
    Promise.all(evmChains.map((chain) => getEvmChainBalance(chain))),
    getQubicBalance(),
  ]);

  return {
    evm,
    qubic,
    donatedStablecoins: evm
      .flatMap((balance) => balance.tokens)
      .reduce((sum, token) => sum + token.amount, 0),
  };
}

const stablecoinFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatStablecoin(value: number) {
  return stablecoinFormatter.format(value);
}
