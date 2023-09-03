import { mergeAttributes, Node, nodeInputRule } from "@tiptap/core";

export interface FigureOptions {
  HTMLAttributes: Record<string, unknown>;
  HTMLAttributesImg: Record<string, unknown>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    figure: {
      /**
       * Add a figure element
       */
      setFigure: (options: {
        src: string;
        alt?: string;
        title?: string;
        caption?: string;
      }) => ReturnType;
    };
  }
}

export const inputRegex = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export const Figure = Node.create<FigureOptions>({
  name: "figure",

  addOptions() {
    return {
      HTMLAttributes: {},
      HTMLAttributesImg: {},
    };
  },

  group: "block",

  content: "inline*",

  draggable: true,

  isolating: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) =>
          element.querySelector("img")?.getAttribute("src"),
      },

      alt: {
        default: null,
        parseHTML: (element) =>
          element.querySelector("img")?.getAttribute("alt"),
      },

      title: {
        default: null,
        parseHTML: (element) =>
          element.querySelector("img")?.getAttribute("title"),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure",
        contentElement: "figcaption",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "figure",
      this.options.HTMLAttributes,
      [
        "img",
        mergeAttributes(HTMLAttributes, this.options.HTMLAttributesImg, {
          draggable: false,
          contenteditable: false,
        }),
      ],
      ["figcaption", 0],
    ];
  },

  addCommands() {
    return {
      setFigure:
        ({ caption, ...attrs }) =>
        ({ chain }) => {
          return chain()
            .insertContent({
              type: this.name,
              attrs,
              content: caption ? [{ type: "text", text: caption }] : [],
            })
            .run();
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, src, alt, title] = match;

          return { src, alt, title };
        },
      }),
    ];
  },
});
