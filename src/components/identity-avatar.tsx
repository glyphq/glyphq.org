"use client";

import Avatar from "boring-avatars";

const COLORS = ["#e8fd94", "#94adff", "#f2ffb0", "#6e8be0", "#c6d4ff", "#2b438d", "#a9beff"];

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
