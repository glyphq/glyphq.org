"use client";

import { CheckCircleIcon } from "@solar-icons/react/linear/check-circle";
import { CopyIcon } from "@solar-icons/react/linear/copy";
import { motion } from "motion/react";
import { useState } from "react";

interface Props {
  value: string;
  label: string;
  iconOnly?: boolean;
}

export default function CopyButton({ value, label, iconOnly = false }: Props) {
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
      aria-label={copied ? "Copied" : `Copy ${label} address`}
      title={copied ? "Copied" : "Copy"}
      className={
        iconOnly
          ? "inline-flex size-9 items-center justify-center rounded-full bg-surface text-ink transition-colors duration-150 hover:bg-[#2A1F21]"
          : "inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 font-display text-xs font-semibold text-ink transition-colors duration-150 hover:bg-[#2A1F21]"
      }
    >
      {copied ? (
        <CheckCircleIcon size={iconOnly ? 16 : 14} aria-hidden="true" />
      ) : (
        <CopyIcon size={iconOnly ? 16 : 14} aria-hidden="true" />
      )}
      {!iconOnly && (copied ? "Copied" : "Copy")}
    </motion.button>
  );
}
