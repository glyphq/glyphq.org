"use client";

import { CheckCircleIcon } from "@solar-icons/react/linear/check-circle";
import { CopyIcon } from "@solar-icons/react/linear/copy";
import { motion } from "motion/react";
import { useState } from "react";

interface Props {
  value: string;
  label: string;
}

export default function CopyButton({ value, label }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={copy}
      whileTap={{ scale: 0.97 }}
      aria-label={`Copy ${label} address`}
      className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 font-display text-xs font-semibold text-ink transition-colors duration-150 hover:bg-[#2A1F21]"
    >
      {copied ? (
        <CheckCircleIcon size={14} aria-hidden="true" />
      ) : (
        <CopyIcon size={14} aria-hidden="true" />
      )}
      {copied ? "Copied" : "Copy"}
    </motion.button>
  );
}
