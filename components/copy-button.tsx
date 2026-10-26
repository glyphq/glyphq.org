"use client";

import { CopyCheckIcon, CopyIcon } from "@solar-icons/react/linear";
import { useEffect, useRef, useState } from "react";
import { SiteIcon } from "@/components/site-icon";
import { cn } from "@/lib/utils";

type CopyState = "idle" | "copied" | "failed";

export function CopyButton({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  const [state, setState] = useState<CopyState>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  async function copyValue() {
    let copied = false;

    try {
      await navigator.clipboard.writeText(value);
      copied = true;
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      } finally {
        textarea.remove();
      }
    }

    setState(copied ? "copied" : "failed");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setState("idle"), 2000);
  }

  const copied = state === "copied";
  const failed = state === "failed";
  const message = copied
    ? `${label} copied`
    : failed
      ? `Could not copy ${label}`
      : `Copy ${label}`;

  return (
    <>
      <button
        type="button"
        onClick={copyValue}
        aria-label={message}
        className={cn(
          "inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-full px-4 text-xs font-medium transition-colors outline-none",
          "bg-foreground/8 text-foreground hover:bg-foreground/14 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          copied && "text-brand",
          className,
        )}
      >
        <SiteIcon icon={copied ? CopyCheckIcon : CopyIcon} size={14} />
        {copied ? "Copied" : failed ? "Try again" : "Copy"}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied
          ? `${label} copied to clipboard`
          : failed
            ? `Could not copy ${label}. Try again.`
            : ""}
      </span>
    </>
  );
}
