import { ArrowRightUpIcon } from "@solar-icons/react/linear";
import { SiteIcon } from "@/components/site-icon";
import {
  formatSponsorDate,
  getSponsorshipThreshold,
  type SponsorTransfer,
} from "@/lib/sponsors";

function shortHash(hash: string) {
  if (hash.length <= 18) return hash;
  return `${hash.slice(0, 8)}…${hash.slice(-6)}`;
}

function Recognition({ transfer }: { transfer: SponsorTransfer }) {
  return (
    <span title={transfer.thresholdId}>
      {getSponsorshipThreshold(transfer.thresholdId)?.recognition ??
        transfer.thresholdId}
    </span>
  );
}

function TransactionCell({ transfer }: { transfer: SponsorTransfer }) {
  const label = shortHash(transfer.transaction);

  if (transfer.transactionUrl) {
    return (
      <a
        href={transfer.transactionUrl}
        target="_blank"
        rel="noreferrer"
        title={transfer.transaction}
        className="inline-flex items-center gap-1 font-mono text-xs text-brand transition-colors hover:text-foreground"
      >
        {label}
        <SiteIcon icon={ArrowRightUpIcon} size={11} />
      </a>
    );
  }

  return (
    <span className="font-mono text-xs" title={transfer.transaction}>
      {label}
    </span>
  );
}

function LedgerTable({ transfers }: { transfers: SponsorTransfer[] }) {
  return (
    <div className="hidden border-t border-foreground/10 md:block">
      <table className="w-full table-fixed text-left text-sm">
        <thead>
          <tr className="border-b border-foreground/10 text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase">
            <th className="w-[12%] px-5 py-4 font-mono font-normal">Date</th>
            <th className="w-[17%] px-5 py-4 font-mono font-normal">Sponsor</th>
            <th className="w-[9%] px-5 py-4 font-mono font-normal">Asset</th>
            <th className="w-[13%] px-5 py-4 font-mono font-normal">Amount</th>
            <th className="w-[21%] px-5 py-4 font-mono font-normal">
              Recognition
            </th>
            <th className="px-5 py-4 font-mono font-normal">Transaction</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer) => (
            <tr
              key={`${transfer.transaction}-${transfer.date}`}
              className="align-top even:bg-foreground/[0.02]"
            >
              <td className="px-5 py-5">
                <time
                  dateTime={transfer.date}
                  className="font-mono text-xs whitespace-nowrap text-muted-foreground"
                >
                  {formatSponsorDate(transfer.date)}
                </time>
              </td>
              <td className="px-5 py-5 font-medium">{transfer.sponsor}</td>
              <td className="px-5 py-5">
                <span className="font-mono text-xs text-brand">
                  {transfer.asset}
                </span>
              </td>
              <td className="px-5 py-5 font-mono text-xs">{transfer.amount}</td>
              <td className="px-5 py-5 text-muted-foreground">
                <Recognition transfer={transfer} />
              </td>
              <td className="px-5 py-5">
                <TransactionCell transfer={transfer} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LedgerList({ transfers }: { transfers: SponsorTransfer[] }) {
  return (
    <div className="divide-y divide-foreground/10 border-t border-foreground/10 md:hidden">
      {transfers.map((transfer) => (
        <article
          key={`${transfer.transaction}-${transfer.date}`}
          className="py-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-medium">{transfer.sponsor}</p>
              <time
                dateTime={transfer.date}
                className="mt-1 block font-mono text-xs text-muted-foreground"
              >
                {formatSponsorDate(transfer.date)}
              </time>
            </div>
            <span className="font-mono text-xs text-brand">
              {transfer.asset}
            </span>
          </div>
          <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-xs">
            <div>
              <dt className="text-muted-foreground">Amount</dt>
              <dd className="mt-1 font-mono">{transfer.amount}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-muted-foreground">Recognition</dt>
              <dd className="mt-1">
                <Recognition transfer={transfer} />
              </dd>
            </div>
            <div className="col-span-2 min-w-0">
              <dt className="text-muted-foreground">Transaction</dt>
              <dd className="mt-1 min-w-0 break-all">
                <TransactionCell transfer={transfer} />
              </dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

function EmptyLedger() {
  return (
    <>
      <div className="border-t border-foreground/10 pt-5 md:hidden">
        <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
          No transfers recorded. The public ledger starts with the first
          confirmed sponsor.
        </p>
      </div>
      <div className="hidden overflow-x-auto border-t border-foreground/10 md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-foreground/10 text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase">
              <th className="py-4 pr-5 font-mono font-normal">Date</th>
              <th className="py-4 pr-5 font-mono font-normal">Sponsor</th>
              <th className="py-4 pr-5 font-mono font-normal">Asset</th>
              <th className="py-4 pr-5 font-mono font-normal">Amount</th>
              <th className="py-4 pr-5 font-mono font-normal">Recognition</th>
              <th className="py-4 font-mono font-normal">Transaction</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={6}
                className="py-8 text-sm leading-relaxed text-muted-foreground text-pretty"
              >
                No transfers recorded. The public ledger starts with the first
                confirmed sponsor.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export function SponsorLedger({ transfers }: { transfers: SponsorTransfer[] }) {
  if (transfers.length === 0) {
    return <EmptyLedger />;
  }

  return (
    <>
      <LedgerTable transfers={transfers} />
      <LedgerList transfers={transfers} />
    </>
  );
}
