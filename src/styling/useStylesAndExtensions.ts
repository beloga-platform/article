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
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Youtube from "@tiptap/extension-youtube";
import { lowlight } from "lowlight";
import tsLanguageSyntax from "highlight.js/lib/languages/typescript";
import cppLanguageSyntax from "highlight.js/lib/languages/cpp";
import jsLanguageSyntax from "highlight.js/lib/languages/javascript";
import pyLanguageSyntax from "highlight.js/lib/languages/python";

import { primaryMono, primarySans } from "./useStylesAndExtensions/customFonts";
import { useIsSmallScreen } from "./useStylesAndExtensions/utils";
import { Figure } from "./useStylesAndExtensions/figure";
import { TrailingNode } from "./useStylesAndExtensions/trailingNode";

lowlight.registerLanguage("ts", tsLanguageSyntax);
lowlight.registerLanguage("js", jsLanguageSyntax);
lowlight.registerLanguage("cpp", cppLanguageSyntax);
lowlight.registerLanguage("python", pyLanguageSyntax);

export default function useStylesAndExtensions({
  isEditable,
}: {
  isEditable: boolean;
}): {
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
          fontFamily: `${primarySans.style.fontFamily}, sans-serif`,
        },
        a: { color: "inherit" },
        "li p": {
          margin: "0px",
          marginTop: "8px",
        },
        ol: {
          fontFamily: `${primarySans.style.fontFamily}, sans-serif`,
          fontSize: isSmallScreen ? "18px" : "20px",
        },
        li: {
          fontFamily: `${primarySans.style.fontFamily}, sans-serif`,
          fontsize: isSmallScreen ? "18px" : "20px",
        },
        "& h1": {
          fontSize: isSmallScreen ? "32px" : "42px",
          fontFamily: `${primarySans.style.fontFamily}, sans-serif`,
          fontWeight: 500,
        },
        "& strong": { fontWeight: 500 },
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
          fontFamily: `${primarySans.style.fontFamily}, sans-serif`,
          fontWeight: 500,
        },
        "& h3": {
          fontSize: isSmallScreen ? "20px" : "24px",
          fontFamily: `${primarySans.style.fontFamily}, sans-serif`,
          fontWeight: 500,
        },
        "& h4": {
          fontFamily: `${primarySans.style.fontFamily}, sans-serif`,
          fontWeight: 500,
        },
        "& blockquote": {
          borderLeft: `3px solid ${
            theme.colorScheme === "dark" ? theme.colors.dark[0] : "black"
          }`,
          margin: "16px 0px",
          padding: "0px 20px",
          fontStyle: "italic",
        },
        "& img": { display: "block" },
        "& figure": {
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          maxWidth: "100%",
          width: "100%",
          borderRadius: "4px",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
          marginTop: "0px",
        },
        "figure img": {
          maxWidth: "100%",
          width: "100%",
        },
        "figure figcaption:has(> br)::before": isEditable
          ? {
              content: '"Image caption (optional)"',
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.gray[7]
                  : theme.colors.gray[4],
              float: "left",
              height: 0,
            }
          : undefined,
        "figure figcaption:has(> br)": isEditable
          ? undefined
          : {
              display: "none",
            },
        "& hr": {
          marginBottom: "20px",
        },
        "& pre": {
          overflowWrap: "anywhere",
        },
        "& code": {
          fontFamily: `${primaryMono.style.fontFamily}, monospace`,
        },
        ".ProseMirror-selectednode": {
          outline: "3px solid",
          outlineColor:
            theme.colorScheme === "dark"
              ? theme.colors.gray[0]
              : theme.colors.dark[9],
        },
        "div iframe": {
          width: "100%",
          borderRadius: "4px",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        },
        "div:has(> iframe)": {
          borderRadius: "4px",
          overflow: "hidden",
          marginBottom: "20px",
          position: "relative",
          paddingBottom: "56.25%",
        },
      },
    },
    extensions: [
      DocumentWithAlwaysHeader,
      StarterKit.configure({
        document: false,
      }),
      Figure.configure({
        HTMLAttributesImg: { id: "article-img" },
      }),
      /**
       * @deprecated - use of Image extension is deprecated, please do not update
       */
      Image.configure({
        HTMLAttributes: {
          style:
            "max-width:100%;margin-left:auto;margin-right:auto;display:flex;width:100%;border-radius:4px;",
          id: "article-img",
        },
      }),
      Placeholder.configure({
        placeholder: "Let your words do the talking.",
      }),
      TextStyle,
      FontFamily,
      Link,
      TextAlign.configure({
        types: ["paragraph"],
        defaultAlignment: "left",
      }),
      Typography,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      TrailingNode.configure({ onlyAfter: ["figure", "youtube"] }),
      Youtube.configure({ HTMLAttributes: { frameBorder: 0 } }),
    ],
  };
}
