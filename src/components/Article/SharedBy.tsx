import { Group, Text, useMantineTheme } from "@mantine/core";
import { IconShare3 } from "@tabler/icons-react";

export default function SharedBy({ authorURL, displayName }: Props) {
  const theme = useMantineTheme();

  return (
    <Group spacing={4}>
      <IconShare3 size={16} color={theme.colors.dark[2]} />
      <Text c="dimmed">
        Shared by{" "}
        <Text
          sx={() => ({
            display: "inline",
            ":hover": { textDecoration: "underline" },
          })}
          href={authorURL}
          component="a"
        >
          {displayName}
        </Text>
      </Text>
    </Group>
  );
}

type Props = {
  authorURL: string;
  displayName: string;
};
