import { Badge } from "@mantine/core";

export default function TopicBadge({ topic }: Props) {
  return (
    <Badge size="xl" key={topic} radius="sm">
      {topic}
    </Badge>
  );
}

type Props = {
  topic: string;
};
