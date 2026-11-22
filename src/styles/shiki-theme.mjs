/** @type {import("shiki").ThemeRegistration} */
export const glyphShikiTheme = {
  name: "glyph-dark",
  type: "dark",
  colors: {
    "editor.background": "#081417",
    "editor.foreground": "#e9f7f7",
  },
  tokenColors: [
    {
      settings: {
        foreground: "#e9f7f7",
      },
    },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#6f8589",
        fontStyle: "italic",
      },
    },
    {
      scope: [
        "keyword",
        "keyword.control",
        "storage",
        "storage.type",
        "storage.modifier",
        "keyword.operator.new",
      ],
      settings: {
        foreground: "#5fd4dc",
      },
    },
    {
      scope: ["string", "string.template", "constant.character.escape"],
      settings: {
        foreground: "#a7e8ec",
      },
    },
    {
      scope: ["constant.numeric", "constant.language", "constant.other.symbol", "constant.other"],
      settings: {
        foreground: "#6fc9d2",
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
        foreground: "#d5f3f4",
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
        foreground: "#8fdde3",
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
        foreground: "#789093",
      },
    },
    {
      scope: ["entity.name.tag", "support.type.property-name", "meta.object-literal.key"],
      settings: {
        foreground: "#5fd4dc",
      },
    },
    {
      scope: ["invalid", "invalid.illegal"],
      settings: {
        foreground: "#ff8a7a",
      },
    },
  ],
};
