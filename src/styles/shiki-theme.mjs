/** @type {import("shiki").ThemeRegistration} */
export const glyphShikiTheme = {
  name: "glyph-dark",
  type: "dark",
  colors: {
    "editor.background": "#0b0f1a",
    "editor.foreground": "#eef2ff",
  },
  tokenColors: [
    {
      settings: {
        foreground: "#eef2ff",
      },
    },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#6c7688",
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
        foreground: "#7aa2ff",
      },
    },
    {
      scope: ["string", "string.template", "constant.character.escape"],
      settings: {
        foreground: "#a9c4ff",
      },
    },
    {
      scope: ["constant.numeric", "constant.language", "constant.other.symbol", "constant.other"],
      settings: {
        foreground: "#92b4ff",
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
        foreground: "#d6e2ff",
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
        foreground: "#8fb3ff",
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
        foreground: "#758095",
      },
    },
    {
      scope: ["entity.name.tag", "support.type.property-name", "meta.object-literal.key"],
      settings: {
        foreground: "#7aa2ff",
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
