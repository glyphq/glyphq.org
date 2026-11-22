/** @type {import("shiki").ThemeRegistration} */
export const glyphShikiTheme = {
  name: "glyph-light",
  type: "light",
  colors: {
    "editor.background": "#F1F3F7",
    "editor.foreground": "#0A0C10",
  },
  tokenColors: [
    {
      settings: {
        foreground: "#0A0C10",
      },
    },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#0052FF",
        fontStyle: "italic",
      },
    },
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.other",
        "keyword.other.import",
        "keyword.control.import",
        "keyword.control.from",
        "storage",
        "storage.type",
        "storage.modifier",
        "keyword.operator.new",
      ],
      settings: {
        foreground: "#0052FF",
      },
    },
    {
      scope: ["string", "string.template", "constant.character.escape"],
      settings: {
        foreground: "#0A0C10",
      },
    },
    {
      scope: ["constant.numeric", "constant.language", "constant.other.symbol", "constant.other"],
      settings: {
        foreground: "#0043D6",
      },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "variable.function",
        "meta.function-call",
      ],
      settings: {
        foreground: "#0A0C10",
      },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.class",
        "support.type",
        "storage.type.interface",
      ],
      settings: {
        foreground: "#0052FF",
      },
    },
    {
      scope: [
        "punctuation",
        "meta.brace",
        "keyword.operator",
        "punctuation.separator",
        "punctuation.terminator",
      ],
      settings: {
        foreground: "#5F6775",
      },
    },
    {
      scope: ["entity.name.tag", "support.type.property-name", "meta.object-literal.key"],
      settings: {
        foreground: "#0052FF",
      },
    },
    {
      scope: ["invalid", "invalid.illegal"],
      settings: {
        foreground: "#B42318",
      },
    },
  ],
};
