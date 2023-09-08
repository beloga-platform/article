import { Accordion, Button, Group } from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconClipboard, IconSparkles } from "@tabler/icons-react";
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
            component="a"
            href={`https://www.beloga.xyz/ai?q=${encodeURIComponent(claim)}`}
            color="blue"
            target="_blank"
            size={isSmallScreen ? "md" : undefined}
            leftIcon={<IconSparkles size={16} />}
          >
            AI Insights
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
