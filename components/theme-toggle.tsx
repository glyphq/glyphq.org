"use client";

import { MoonIcon, SunIcon } from "@solar-icons/react/linear";
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
        <SiteIcon icon={MoonIcon} size={18} />
      ) : (
        <SiteIcon icon={SunIcon} size={18} />
      )}
    </button>
  );
}
