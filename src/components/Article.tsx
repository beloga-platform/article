import { Badge, Box, Card, Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import readingTime from "reading-time";

import Content from "./Article/Content";
import TopicBadge from "./Article/TopicBadge";
import SharedBy from "./Article/SharedBy";
import PreviewArticleCard from "./Article/PreviewArticleCard";

import { extractContent } from "../modules/utils";

export default function Article() {
  const { htmlContent, ...articleInfo } = extractContent(document);

  if (!articleInfo || !htmlContent) return null;

  return (
    <Box
      sx={() => ({
        maxWidth: "740px",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "80px",
      })}
    >
      <Stack sx={() => ({ marginTop: "32px" })} spacing={16}>
        <Card withBorder bg="inherit">
          <Stack spacing={4}>
            <SharedBy
              displayName={articleInfo.displayName}
              authorURL={articleInfo.authorURL}
            />

            <Group spacing={8}>
              <Text size="s">
                {dayjs(articleInfo.createdAt).format("MMM D, YYYY")}
              </Text>
              {articleInfo.claims && (
                <Badge color="yellow">
                  {articleInfo.claims.length} claim
                  {articleInfo.claims.length > 1 && "s"}
                </Badge>
              )}
              <Badge color="green">{readingTime(htmlContent || "").text}</Badge>
            </Group>
          </Stack>
        </Card>
      </Stack>

      <Content htmlContent={htmlContent} />

      {articleInfo.originalSource && (
        <Box mt={50}>
          <PreviewArticleCard originalSource={articleInfo.originalSource} />
        </Box>
      )}

      {articleInfo.topics && (
        <Group mt={50} spacing={8}>
          {articleInfo?.topics.map((topic) => (
            <TopicBadge key={topic} topic={topic} />
          ))}
        </Group>
      )}
    </Box>
  );
}
