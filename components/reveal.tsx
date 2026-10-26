"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 16,
  mount = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  mount?: boolean;
}) {
  const visible = { opacity: 1, y: 0 };

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: distance }}
      {...(mount
        ? { animate: visible }
        : {
            whileInView: visible,
            viewport: {
              once: true,
              amount: 0.16,
              margin: "0px 0px -8% 0px",
            },
          })}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
