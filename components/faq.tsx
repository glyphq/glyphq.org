"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

export function Faq({ items }: { items: readonly FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-t border-foreground/10">
      {items.map((item, index) => {
        const isOpen = open === index;

        return (
          <div key={item.question} className="border-b border-foreground/10">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              onClick={() => setOpen(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span className="font-display text-lg leading-snug font-medium tracking-[-0.02em] text-balance sm:text-xl">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className="relative size-4 shrink-0 text-brand"
              >
                <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                <motion.span
                  className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current"
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={`faq-panel-${index}`}
                  key="content"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.25,
                    ease: "easeOut",
                  }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-5 pr-10 text-sm leading-relaxed text-muted-foreground text-pretty">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
