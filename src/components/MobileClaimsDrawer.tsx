import React from "react";
import { Drawer, Affix, Text, Accordion, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import useIsMediumScreen from "../hooks/useIsMediumScreen";
import useIsSmallScreen from "../hooks/useIsSmallScreen";
import Claim from "./Article/ClaimsList/Claim";

export default function MobileClaimsDrawer({ claims }: Props) {
  const [isClaimsDrawerOpened, { open, close }] = useDisclosure();
  const isSmallScreen = useIsSmallScreen();
  const isMediumScreen = useIsMediumScreen();
  const isSmallFormFactor = isSmallScreen || isMediumScreen;

  if (!claims) return null;

  return (
    <>
      <Drawer
        opened={isClaimsDrawerOpened}
        onClose={close}
        transitionProps={{ duration: 400 }}
        title={
          <Text
            sx={() => ({
              textTransform: "uppercase",
              width: "fit-content",
            })}
            fz="sm"
          >
            Summary
          </Text>
        }
      >
        {claims.length > 0 ? (
          <Accordion w="100%">
            {claims.map((claim, index) => (
              <Claim key={index} index={index} claim={claim} />
            ))}
          </Accordion>
        ) : (
          <Text>There are no claims found for this article.</Text>
        )}
      </Drawer>

      <Affix
        position={{ bottom: "40px", left: "0px" }}
        display={!isSmallFormFactor ? "none" : undefined}
      >
        <Button
          sx={() => ({
            padding: "16px 12px",
            height: "fit-content",
            borderRadius: "0px",
          })}
          onClick={open}
        >
          <Text
            sx={() => ({
              textTransform: "uppercase",
              textOrientation: "sideways",
              writingMode: "vertical-lr",
              transform: "rotate(180deg)",
            })}
          >
            Summary
          </Text>
        </Button>
      </Affix>
    </>
  );
}

type Props = {
  claims: string[];
};
