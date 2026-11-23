"use client";

import Avatar from "boring-avatars";

const COLORS = ["#e8d2b8", "#d8bfa4", "#f2ede6", "#a39c92", "#8f887f", "#c0a88f", "#191818"];

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
