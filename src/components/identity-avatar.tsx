"use client";

import Avatar from "boring-avatars";

const COLORS = ["#a9c7ff", "#b6d0ff", "#c6daff", "#8c97a8", "#edf2fa", "#6f8fc7", "#d8e5ff"];

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
