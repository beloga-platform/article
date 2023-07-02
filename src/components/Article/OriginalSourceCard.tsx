import { Anchor, Card, Text } from "@mantine/core";

export default function OriginalSourceCard({
  originalAuthor,
  originalURL,
}: Props) {
  return (
    <Card withBorder bg="inherit">
      {originalAuthor && (
        <Text display="inline">
          This article was originally authored by{" "}
          <Text weight={600} display="inline">
            {originalAuthor}
          </Text>
          .{" "}
        </Text>
      )}
      {originalURL && (
        <Text display="inline" sx={() => ({ a: { color: "inherit" } })}>
          Source material can be found{" "}
          <Anchor
            href={originalURL}
            target="_blank"
            sx={() => ({ display: "inline", textDecoration: "underline" })}
          >
            here
          </Anchor>
          .
        </Text>
      )}
    </Card>
  );
}

type Props = {
  originalAuthor?: string;
  originalURL?: string;
};
