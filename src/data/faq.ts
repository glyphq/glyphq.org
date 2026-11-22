export interface FaqItem {
  question: string;
  answer: string;
}

export const faqs: FaqItem[] = [
  {
    question: "What is Glyph?",
    answer:
      "Glyph is an open-source, self-custodial desktop wallet for Qubic. It manages Vaults and Qubic identities, sends and receives QU, and reviews requests from connected apps. It runs on Windows, macOS, and Linux.",
  },
  {
    question: "Where are my seed and keys stored?",
    answer:
      "Account seeds are stored inside password-encrypted Vault data on your computer. Glyph does not upload your seed or Vault password to a Glyph account or recovery service.",
  },
  {
    question: "What is a Vault?",
    answer:
      "A Vault is the local, password-encrypted container for your Qubic accounts. It can hold up to 16 accounts, each backed by a 55-character lowercase Qubic seed.",
  },
  {
    question: "Can I import an existing Qubic wallet?",
    answer:
      "Yes. On first launch you can create a new Vault, import an existing 55-character lowercase Qubic seed, or import a password-protected Glyph Vault export. Importing a seed does not bring over contacts, memos, or other local metadata from another installation.",
  },
  {
    question: "What happens if I forget my Vault password or lose my seed?",
    answer:
      "Glyph cannot recover a seed or reset a forgotten Vault password. Keep an offline backup of every seed and test it before you rely on it.",
  },
  {
    question: "Which platforms does Glyph support?",
    answer:
      "Glyph runs on Windows, macOS (Apple Silicon and Intel), and Linux (AppImage, Debian, and RPM packages). It is not a browser or mobile wallet, and it does not run on 32-bit systems.",
  },
  {
    question: "How do connected app requests work?",
    answer:
      "Connected Qubic apps can open supported glyph:// requests in Glyph. Glyph shows the request details so you can approve or decline it. Manage connected apps and their permissions in Settings → Connected apps.",
  },
  {
    question: "Do scheduled transfers send automatically?",
    answer:
      "No. Scheduled transfers are local templates. Glyph does not run a background executor, so use Send now to open, review, and approve a transfer manually.",
  },
  {
    question: "Is Glyph open source?",
    answer:
      "Yes. Glyph Wallet is MIT-licensed. The source is available at github.com/glyphq/wallet.",
  },
];
