// editor.ts
// Define the type for Monaco theme data
interface IStandaloneThemeData {
  base: "vs" | "vs-dark" | "hc-black";
  inherit: boolean;
  rules: { token: string; foreground?: string; background?: string; fontStyle?: string }[];
  colors: { [key: string]: string };
}

// IDX theme JSON object embedded directly
export const idxTheme: IStandaloneThemeData = {
  base: "vs-dark",
  inherit: true,
  rules: [
    { background: "1E1E1E", token: "" },
    { background: "2A2A2A", token: "text.html source.active4d" },
    { foreground: "D4D4D4", token: "text.xml" },
    { foreground: "6A9955", token: "comment.line" },
    { foreground: "6A9955", token: "comment.block" },
    { foreground: "CE9178", token: "string" },
    { foreground: "9CDCFE", fontStyle: "bold", token: "string.interpolated variable" },
    { foreground: "B5CEA8", token: "constant.numeric" },
    { foreground: "9CDCFE", fontStyle: "bold", token: "constant.other.date" },
    { foreground: "9CDCFE", fontStyle: "bold", token: "constant.other.time" },
    { foreground: "C586C0", token: "constant.language" },
    { foreground: "9CDCFE", fontStyle: "bold", token: "variable.other.local" },
    { foreground: "4FC1FF", fontStyle: "bold", token: "variable" },
    { foreground: "6796E6", token: "variable.other.table-field" },
    { foreground: "569CD6", fontStyle: "bold", token: "keyword" },
    { foreground: "DCDCAA", token: "storage" },
    { foreground: "4EC9B0", token: "entity.name.type" },
    { foreground: "4EC9B0", token: "entity.name.function" },
    { foreground: "7F8488", token: "meta.tag" },
    { foreground: "569CD6", token: "entity.name.tag" },
    { foreground: "D7BA7D", token: "entity.other.attribute-name" },
    { foreground: "DCDCAA", fontStyle: "bold", token: "support.function" },
    { foreground: "CE9178", token: "support.constant" },
    { foreground: "4EC9B0", token: "support.type" },
    { foreground: "4EC9B0", token: "support.class" },
    { foreground: "4EC9B0", token: "support.variable" },
    { foreground: "FFFFFF", background: "FF5555", token: "invalid" },
    { foreground: "D4D4D4", background: "3F3F3F", token: "meta.diff" },
    { foreground: "FFFFFF", background: "4B8BFF", token: "meta.diff.range" },
    { foreground: "D4D4D4", background: "FF5555", token: "markup.deleted.diff" },
    { foreground: "D4D4D4", background: "55FF55", token: "markup.inserted.diff" },
    { foreground: "7F8488", token: "source.diff" },
  ],
  colors: {
    "editor.foreground": "#D4D4D4",
    "editor.background": "#1E1E1E",
    "editor.selectionBackground": "#264F78",
    "editor.lineHighlightBackground": "#2A2A2A",
    "editorCursor.foreground": "#FFFFFF",
    "editorWhitespace.foreground": "#3B3B3B",
  },
};

