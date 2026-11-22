"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { faqs } from "../data/faq";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const reduced = useReducedMotion();

  return (
    <div className="mx-auto mt-12 max-w-3xl space-y-3">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <motion.div
            key={faq.question}
            className="overflow-hidden rounded-2xl bg-surface"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 0.28, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left md:px-6 md:py-5"
              >
                <span className="text-base font-medium leading-6 text-ink md:text-lg">
                  {faq.question}
                </span>
                <span
                  className={`text-xl leading-none text-muted transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={
                    reduced ? { duration: 0 } : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
                  }
                >
                  <p className="px-5 pb-5 text-sm leading-6 text-muted md:px-6 md:pb-6 md:text-base md:leading-7">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
