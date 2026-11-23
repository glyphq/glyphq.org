"use client";

import Avatar from "boring-avatars";

const COLORS = ["#ECEEEE", "#C8CCCC", "#A0A4A5", "#787D7F", "#5C6164", "#3C4144"];

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
