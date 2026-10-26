"use client";

import {
  ArrowUpRight,
  Cancel,
  Download,
  FileText,
  GitBranch,
  Home,
  Information,
  Layers,
  MessageCircle,
  Search,
} from "@hugeicons/core-free-icons";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { siteButtonClasses } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";
import { mainNav, resourceLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

const pageIcons = {
  Features: Layers,
  Products: FileText,
  Download: Download,
  About: Information,
} as const;

const itemClass =
  "flex cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 text-sm outline-none data-[selected=true]:bg-foreground/5 [&_svg]:size-4 [&_svg]:shrink-0";

const groupClass =
  "[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground";

export function SiteCommand() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        event.key.toLowerCase() !== "k" ||
        !(event.metaKey || event.ctrlKey)
      ) {
        return;
      }
      event.preventDefault();
      setOpen((value) => !value);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
        className={cn(
          siteButtonClasses({ variant: "ghost", size: "md" }),
          "hidden gap-2 md:inline-flex",
        )}
      >
        <SiteIcon icon={Search} size={16} />
        <span className="hidden lg:inline">Search</span>
        <kbd className="hidden rounded bg-foreground/10 px-1.5 py-0.5 font-mono text-[10px] lg:inline">
          ⌘K
        </kbd>
      </button>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command menu"
        className={cn(
          siteButtonClasses({ variant: "ghost", size: "icon" }),
          "md:hidden",
        )}
      >
        <SiteIcon icon={Search} size={18} />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Command menu"
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setOpen(false);
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
        }}
        className="fixed inset-0 m-auto h-fit max-h-[85vh] w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-2xl border-0 bg-popover p-0 text-popover-foreground outline-none backdrop:bg-background/75"
      >
        <Command label="Command menu" className="flex flex-col">
          <div className="flex items-center justify-end px-4 py-2">
            <button
              type="button"
              aria-label="Close command menu"
              onClick={() => setOpen(false)}
              className={siteButtonClasses({
                variant: "ghost",
                size: "icon-sm",
              })}
            >
              <SiteIcon icon={Cancel} size={16} />
            </button>
          </div>
          <div className="flex items-center gap-2 px-4 pb-3">
            <SiteIcon
              icon={Search}
              size={16}
              className="text-muted-foreground"
            />
            <Command.Input
              autoFocus
              placeholder="Search pages and resources..."
              className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          <Command.List className="max-h-[min(60vh,28rem)] overflow-y-auto p-2 pt-0">
            <Command.Empty className="px-2.5 py-6 text-sm text-muted-foreground">
              No results found.
            </Command.Empty>
            <Command.Group heading="Pages" className={groupClass}>
              <Command.Item
                value="home"
                onSelect={() => go("/")}
                className={itemClass}
              >
                <SiteIcon icon={Home} />
                Home
              </Command.Item>
              {mainNav.map((item) => {
                const Icon = pageIcons[item.label as keyof typeof pageIcons];
                return (
                  <Command.Item
                    key={item.href}
                    value={item.label}
                    onSelect={() => go(item.href)}
                    className={itemClass}
                  >
                    {Icon ? <SiteIcon icon={Icon} /> : null}
                    {item.label}
                  </Command.Item>
                );
              })}
            </Command.Group>
            <Command.Separator className="my-2 h-px bg-foreground/10" />
            <Command.Group heading="Resources" className={groupClass}>
              {resourceLinks.map((item) => (
                <Command.Item
                  key={item.href}
                  value={item.label}
                  onSelect={() => {
                    setOpen(false);
                    window.open(item.href, "_blank", "noopener,noreferrer");
                  }}
                  className={itemClass}
                >
                  {item.label === "GitHub" ? (
                    <SiteIcon icon={GitBranch} />
                  ) : item.label === "Discord" ? (
                    <SiteIcon icon={MessageCircle} />
                  ) : (
                    <SiteIcon icon={ArrowUpRight} />
                  )}
                  {item.label}
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </dialog>
    </>
  );
}
