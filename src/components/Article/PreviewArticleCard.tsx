import { Card, Stack, Title, Text, Group, Center } from "@mantine/core";
import { IconNews } from "@tabler/icons-react";

import useIsSmallScreen from "../../hooks/useIsSmallScreen";

export default function PreviewArticleCard({
  originalSource: { title, textContent, url },
}: Props) {
  const isSmallScreen = useIsSmallScreen();

  return (
    <Card radius="md" component="a" href={url} target="_blank">
      <Group sx={() => ({ flexWrap: "nowrap" })}>
        <Center
          w={isSmallScreen ? "64px" : "100px"}
          sx={() => ({ flexShrink: 0 })}
        >
          <IconNews size={isSmallScreen ? "2rem" : "3rem"} />
        </Center>
        <Stack sx={() => ({ flexShrink: 1, width: "100%" })}>
          <Title
            order={isSmallScreen ? 4 : 3}
            lineClamp={2}
            fw={500}
            sx={(theme) => ({
              color:
                theme.colorScheme === "dark"
                  ? theme.colors.gray[0]
                  : theme.colors.dark[9],
            })}
          >
            {title}
          </Title>
          <Text
            lineClamp={isSmallScreen ? 2 : 3}
            sx={() => ({ textDecoration: "none", wordBreak: "break-word" })}
            fz="sm"
          >
            {textContent.replace(/\n/g, " ")}
          </Text>
        </Stack>
      </Group>
    </Card>
  );
}

type Props = {
  originalSource: { title: string; url: string; textContent: string };
};
