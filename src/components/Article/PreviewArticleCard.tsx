import { Card, Stack, Title, Text, Image } from "@mantine/core";

import useIsSmallScreen from "../../hooks/useIsSmallScreen";

export default function PreviewArticleCard({
  originalSource: { title, description, url, coverImageURL },
}: Props) {
  const isSmallScreen = useIsSmallScreen();

  return (
    <Card radius="md" component="a" href={url} target="_blank" withBorder>
      {coverImageURL && (
        <Card.Section mb={8}>
          <Image
            src={coverImageURL}
            alt="Article cover image"
            height={isSmallScreen ? 150 : 200}
          />
        </Card.Section>
      )}

      <Stack sx={() => ({ flexShrink: 1, width: "100%" })} spacing={4}>
        <Text fz="sm" lineClamp={1} sx={() => ({ wordBreak: "break-all" })}>
          {url.split("//")[1].split("/")[0].replace("www.", "")}
        </Text>
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
          {description}
        </Text>
      </Stack>
    </Card>
  );
}

type Props = {
  originalSource: {
    title: string;
    url: string;
    description: string;
    coverImageURL: string | null;
  };
};
