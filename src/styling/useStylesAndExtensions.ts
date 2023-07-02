import { Styles, useMantineTheme } from "@mantine/core";
import { RichTextEditorStylesNames } from "@mantine/tiptap";
import { Extensions } from "@tiptap/react";
import { Link } from "@mantine/tiptap";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Document from "@tiptap/extension-document";
import Typography from "@tiptap/extension-typography";

import { useIsSmallScreen } from "./useStylesAndExtensions/utils";

export default function useStylesAndExtensions(): {
  articleStyles: Styles<RichTextEditorStylesNames, Record<string, unknown>>;
  extensions: Extensions;
} {
  const theme = useMantineTheme();

  const DocumentWithAlwaysHeader = Document.extend({
    content: "heading block*",
  });
  const isSmallScreen = useIsSmallScreen();

  return {
    articleStyles: {
      content: {
        "& p": {
          fontSize: isSmallScreen ? "18px" : "20px",
          marginTop: "0px",
          fontFamily: "sans-serif",
        },
        a: { color: "inherit" },
        "li p": {
          margin: "0px",
          marginTop: "8px",
        },
        ol: {
          fontFamily: "sans-serif",
          fontSize: isSmallScreen ? "18px" : "20px",
        },
        li: {
          fontFamily: "sans-serif",
          fontsize: isSmallScreen ? "18px" : "20px",
        },
        "& h1": {
          fontSize: isSmallScreen ? "32px" : "42px",
          fontFamily: "sans-serif",
        },
        ".is-editor-empty:before": {
          userSelect: "none",
          content: "attr(data-placeholder)",
          pointerEvents: "none",
          color:
            theme.colorScheme === "dark"
              ? theme.colors.gray[7]
              : theme.colors.gray[4],
          float: "left",
          height: 0,
        },
        "& h2": {
          fontSize: isSmallScreen ? "24px" : "30px",
          fontFamily: "sans-serif",
        },
        "& h3": {
          fontSize: isSmallScreen ? "20px" : "24px",
          fontFamily: "sans-serif",
        },
        "& blockquote": {
          borderLeft: `3px solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[0] : "black"
          }`,
          margin: "16px 0px",
          padding: "0px 20px",
          fontStyle: "italic",
        },
        "& img": {
          marginTop: "20px",
        },
        "img + p": {
          fontSize: "1rem",
        },
        "& hr": {
          marginBottom: "20px",
        },
        "& pre": {
          overflowWrap: "anywhere",
        },
        ".ProseMirror-selectednode": {
          outline: "3px solid",
          outlineColor:
            theme.colorScheme === "dark"
              ? theme.colors.gray[0]
              : theme.colors.dark[9],
        },
      },
    },
    extensions: [
      DocumentWithAlwaysHeader,
      StarterKit.configure({
        document: false,
      }),
      Image.configure({
        HTMLAttributes: {
          style:
            "max-width:100%;margin-left:auto;margin-right:auto;display:flex;width:100%;border-radius:4px;",
          id: "article-img",
        },
      }),
      Placeholder.configure({
        placeholder: "Uncover the truth...",
      }),
      TextStyle,
      FontFamily,
      Link,
      TextAlign.configure({
        types: ["paragraph"],
        defaultAlignment: "left",
      }),
      Typography,
    ],
  };
}
