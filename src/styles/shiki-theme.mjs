/** @type {import("shiki").ThemeRegistration} */
export const glyphShikiTheme = {
  name: "glyph-dark",
  type: "dark",
  colors: {
    "editor.background": "#1A1513",
    "editor.foreground": "#EED3BA",
  },
  tokenColors: [
    {
      settings: {
        foreground: "#EED3BA",
      },
    },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: {
        foreground: "#8F7A6E",
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
        foreground: "#F2A6A0",
      },
    },
    {
      scope: ["string", "string.template", "constant.character.escape"],
      settings: {
        foreground: "#EDC78F",
      },
    },
    {
      scope: ["constant.numeric", "constant.language", "constant.other.symbol", "constant.other"],
      settings: {
        foreground: "#D8A66B",
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
        foreground: "#F8E6D2",
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
        foreground: "#E7B7B0",
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
        foreground: "#9B8174",
      },
    },
    {
      scope: ["entity.name.tag", "support.type.property-name", "meta.object-literal.key"],
      settings: {
        foreground: "#E7B486",
      },
    },
    {
      scope: ["invalid", "invalid.illegal"],
      settings: {
        foreground: "#F58A8A",
      },
    },
  ],
};
