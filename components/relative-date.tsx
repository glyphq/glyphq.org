"use client";

import moment from "moment";
import { useEffect, useState } from "react";

export function RelativeDate({
  date,
  className,
}: {
  date: string;
  className?: string;
}) {
  const exact = moment(date).format("MMM DD, YYYY");
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setLabel(moment(date).fromNow());

    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, [date]);

  return (
    <time
      dateTime={date}
      title={exact}
      className={className}
      suppressHydrationWarning
    >
      {label ?? exact}
    </time>
  );
}
