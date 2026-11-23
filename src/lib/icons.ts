import {
  Box,
  CircleCheck,
  Code,
  Comment,
  Database,
  FileText,
  Globe,
  Heart,
  House,
  Layers,
  Server,
  ShieldKeyhole,
  Wallet,
  Xmark,
} from "@gravity-ui/icons";

export const icons = {
  box: Box,
  chat: Comment,
  checkCircle: CircleCheck,
  close: Xmark,
  code: Code,
  database: Database,
  document: FileText,
  globe: Globe,
  handHeart: Heart,
  home: House,
  layers: Layers,
  server: Server,
  shield: ShieldKeyhole,
  wallet: Wallet,
} as const;

export type IconName = keyof typeof icons;
