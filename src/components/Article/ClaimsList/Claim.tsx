import { Accordion, Button, Group, Text } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconClipboard } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";

import useIsSmallScreen from "../../../hooks/useIsSmallScreen";

export default function Claim({ index, claim }: Props) {
  const { copy } = useClipboard();
  const isSmallScreen = useIsSmallScreen();

  return (
    <Accordion.Item value={index.toString()} key={index} w="100%">
      <Accordion.Control>{claim}</Accordion.Control>
      <Accordion.Panel>
        <Group spacing={8}>
          <Button
            leftIcon={<Text sx={() => ({ fontSize: "18px" })}>✨</Text>}
            component="a"
            href={`https://www.beloga.xyz/assistant?q=${encodeURIComponent(
              claim
            )}`}
            color="blue"
            target="_blank"
            size={isSmallScreen ? "md" : undefined}
          >
            Fact insights
          </Button>
          <Button
            leftIcon={<IconClipboard size={14} />}
            onClick={() => {
              copy(claim);
              showNotification({
                color: "green",
                message: "Claim copied to clipboard.",
                icon: <IconClipboard size={14} />,
              });
            }}
            size={isSmallScreen ? "md" : undefined}
          >
            Copy
          </Button>
        </Group>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

type Props = {
  index: number;
  claim: string;
};
