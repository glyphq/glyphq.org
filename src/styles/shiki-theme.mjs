/** @type {import("shiki").ThemeRegistration} */
export const glyphShikiTheme = {
  name: "glyph-dark",
  type: "dark",
  colors: {
    "editor.background": "#0F0E0E",
    "editor.foreground": "#E9EDF5",
  },
  tokenColors: [
    {
      settings: {
        foreground: "#E9EDF5",
      },
    },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#6F9BFF",
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
        foreground: "#6F9BFF",
      },
    },
    {
      scope: ["string", "string.template", "constant.character.escape"],
      settings: {
        foreground: "#E9EDF5",
      },
    },
    {
      scope: ["constant.numeric", "constant.language", "constant.other.symbol", "constant.other"],
      settings: {
        foreground: "#0052FF",
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
        foreground: "#E9EDF5",
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
        foreground: "#6F9BFF",
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
        foreground: "#8A94A6",
      },
    },
    {
      scope: ["entity.name.tag", "support.type.property-name", "meta.object-literal.key"],
      settings: {
        foreground: "#6F9BFF",
      },
    },
    {
      scope: ["invalid", "invalid.illegal"],
      settings: {
        foreground: "#FF9A9A",
      },
    },
  ],
};
