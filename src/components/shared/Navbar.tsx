import {
  Anchor,
  useMantineColorScheme,
  Image,
  Box,
  ActionIcon,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export default function Navbar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Box
      sx={(theme) => ({
        padding: "0px 20px",
        width: "100%",
        height: "60px",
        position: "sticky",
        top: 0,
        backgroundColor:
          colorScheme === "dark" ? theme.colors.dark[7] : "white",
        zIndex: 1,
        borderBottomStyle: "solid",
        borderBottomColor:
          colorScheme === "light" ? theme.colors.gray[4] : theme.colors.dark[4],
      })}
    >
      <Box
        sx={() => ({
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        })}
      >
        <Anchor href="https://www.beloga.xyz">
          <Image
            src={
              colorScheme === "light"
                ? "QmbHjkfdiaBFnr3fFqJZ9NKwvbftk8JrJSRqFeZNfQoR6W"
                : "QmRQ5NCK46B9QrSBr18u5Z8wefThceedzqAop9okFmEkkm"
            }
            alt="Beloga logo"
            height={32}
          />
        </Anchor>
        <ActionIcon
          onClick={() =>
            toggleColorScheme(colorScheme === "dark" ? "light" : "dark")
          }
        >
          {colorScheme === "dark" ? (
            <IconSun size={24} />
          ) : (
            <IconMoonStars size={24} />
          )}
        </ActionIcon>
      </Box>
    </Box>
  );
}
