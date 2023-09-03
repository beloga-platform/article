import { Group, Text } from "@mantine/core";
import { IconArchive } from "@tabler/icons-react";

export default function AnnouncementBanner() {
  return (
    <Group
      sx={(theme) => ({
        padding: "4px 0px",
        justifyContent: "center",
        gap: "8px",
        backgroundColor:
          theme.colorScheme === "light"
            ? theme.colors.orange[0]
            : theme.colors.gray[9],
      })}
    >
      <IconArchive size={14} />
      <Text align="center">Immutable copy (0.12.2)</Text>
    </Group>
  );
}
