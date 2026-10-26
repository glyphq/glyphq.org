const faqs = [
  {
    question: "How do Qubic transfers work?",
    answer:
      "Send QU to the Qubic identity published on this page. Qubic transfers are public, so the transaction can be verified on the network. After sending, message us in Discord with the transaction ID and the sponsor name you want listed.",
  },
  {
    question: "How do USDT transfers work?",
    answer:
      "Send USDT only on the network shown with the address. A transfer on another network may be unrecoverable. Copy the address from this page rather than from a screenshot, and keep the transaction ID for the ledger.",
  },
  {
    question: "How is a tier recognized?",
    answer:
      "A sponsorship is placed at the highest tier its confirmed USDT value reaches. QU is valued at the time the transfer is confirmed. If a transfer is close to a threshold, talk to us before sending so the level is clear.",
  },
  {
    question: "What appears in the public ledger?",
    answer:
      "Each confirmed transfer is listed with its date, sponsor, asset, amount, tier, and transaction. Entries are append-only. Sponsors can choose to appear as Anonymous; the transfer itself remains public on-chain.",
  },
];

export function SponsorFaq() {
  return (
    <div className="divide-y divide-foreground/10 border-t border-foreground/10">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded-sm outline-none [&::-webkit-details-marker]:hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            <span className="font-display text-lg leading-snug font-medium tracking-[-0.02em] text-balance sm:text-xl">
              {faq.question}
            </span>
            <span
              aria-hidden="true"
              className="relative mt-1.5 size-4 shrink-0 text-brand"
            >
              <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
              <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-transform duration-200 group-open:rotate-90" />
            </span>
          </summary>
          <p className="mt-4 max-w-2xl pr-8 text-sm leading-relaxed text-muted-foreground text-pretty">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
