"use client";

import { Moon, Sun } from "@hugeicons/core-free-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { siteButtonClasses } from "@/components/site-button";
import { SiteIcon } from "@/components/site-icon";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={siteButtonClasses({ variant: "ghost", size: "icon" })}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? (
        <SiteIcon icon={Moon} size={18} />
      ) : (
        <SiteIcon icon={Sun} size={18} />
      )}
    </button>
  );
}
