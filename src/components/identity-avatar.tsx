"use client";

import Avatar from "boring-avatars";

const COLORS = ["#0052ff", "#4d7fff", "#99b7ff", "#e6eeff", "#0a0c10", "#b3c7ff", "#d6e2ff"];

interface Props {
  value: string;
  size?: number;
}

export default function IdentityAvatar({ value, size = 22 }: Props) {
  return (
    <span
      className="inline-flex shrink-0 overflow-hidden rounded-full ring-1 ring-ink/10"
      style={{ height: size, width: size }}
    >
      <Avatar colors={COLORS} name={value || "unknown"} size={size} variant="marble" />
    </span>
  );
}
