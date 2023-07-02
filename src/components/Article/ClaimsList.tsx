import { Stack, Accordion, Text } from "@mantine/core";

import Claim from "./ClaimsList/Claim";

export default function ClaimsList({ claims }: Props) {
  return (
    <Stack>
      <Text
        sx={() => ({
          textTransform: "uppercase",
          width: "fit-content",
        })}
        fz="sm"
      >
        Summary
      </Text>

      {claims.length > 0 ? (
        <Accordion w="100%">
          {claims.map((claim, index) => (
            <Claim key={index} index={index} claim={claim} />
          ))}
        </Accordion>
      ) : (
        <Text>There are no claims found for this article.</Text>
      )}
    </Stack>
  );
}

type Props = {
  claims: string[];
};
