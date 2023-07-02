import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";

import useStylesAndExtensions from "../../styling/useStylesAndExtensions";

export default function Content({ htmlContent }: Props) {
  const { articleStyles, extensions } = useStylesAndExtensions();
  const editor = useEditor({
    editable: false,
    extensions: extensions,
    content: htmlContent,
  });

  return (
    <article>
      <RichTextEditor
        editor={editor}
        sx={() => ({ border: "none" })}
        withTypographyStyles={false}
        styles={articleStyles}
      >
        <RichTextEditor.Content
          sx={() => ({ ".ProseMirror": { padding: "0px" } })}
        />
      </RichTextEditor>
    </article>
  );
}

type Props = {
  htmlContent: string;
};
