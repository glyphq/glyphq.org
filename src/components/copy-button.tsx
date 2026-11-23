"use client";

import { CircleCheck, Copy } from "@gravity-ui/icons";
import { motion } from "motion/react";
import { useState } from "react";

interface Props {
  value: string;
  label: string;
  iconOnly?: boolean;
  fullWidth?: boolean;
  text?: string;
}

export default function CopyButton({
  value,
  label,
  iconOnly = false,
  fullWidth = false,
  text = "Copy",
}: Props) {
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

  const className = iconOnly
    ? "corner-frame inline-flex size-9 items-center justify-center rounded-[3px] bg-surface text-ink transition-colors duration-150 hover:bg-raised"
    : fullWidth
      ? "corner-frame inline-flex w-full items-center justify-center gap-1.5 rounded-[3px] bg-accent px-4 py-3 font-mono text-sm font-medium text-night transition-colors duration-150 hover:bg-accent-strong"
      : "corner-frame inline-flex items-center gap-1.5 rounded-[3px] bg-surface px-3 py-1.5 font-mono text-xs font-medium text-ink transition-colors duration-150 hover:bg-raised";

  return (
    <motion.button
      type="button"
      onClick={copy}
      whileTap={{ scale: 0.97 }}
      aria-label={copied ? "Copied" : `Copy ${label} address`}
      title={copied ? "Copied" : "Copy"}
      className={className}
    >
      {copied ? (
        <CircleCheck
          width={iconOnly ? 16 : fullWidth ? 16 : 14}
          height={iconOnly ? 16 : fullWidth ? 16 : 14}
          aria-hidden="true"
        />
      ) : (
        <Copy
          width={iconOnly ? 16 : fullWidth ? 16 : 14}
          height={iconOnly ? 16 : fullWidth ? 16 : 14}
          aria-hidden="true"
        />
      )}
      {!iconOnly && (copied ? "Copied" : text)}
    </motion.button>
  );
}
