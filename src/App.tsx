import {
  Box,
  ColorScheme,
  ColorSchemeProvider,
  Group,
  MantineProvider,
} from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { Notifications } from "@mantine/notifications";

import AnnouncementBanner from "./components/AnnouncementBanner";
import Article from "./components/Article";
import Navbar from "./components/shared/Navbar";
import { extractContent } from "./modules/utils";
import useIsSmallScreen from "./hooks/useIsSmallScreen";
import useIsMediumScreen from "./hooks/useIsMediumScreen";
import ClaimsList from "./components/Article/ClaimsList";
import MobileClaimsDrawer from "./components/MobileClaimsDrawer";

function App() {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: undefined,
  });
  const isSmallScreen = useIsSmallScreen();
  const isMediumScreen = useIsMediumScreen();

  const { claims } = extractContent(document);

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        primaryColor: "gray",
        colorScheme: colorScheme || systemColorScheme,
      }}
    >
      <ColorSchemeProvider
        colorScheme={colorScheme || systemColorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <Notifications />
        <Box sx={() => ({ minHeight: "100%" })}>
          <Navbar />
          <AnnouncementBanner />
          <MobileClaimsDrawer claims={claims} />
          <Box sx={() => ({ padding: "0px 20px" })}>
            <Group
              sx={() => ({
                alignItems: "flex-start",
                marginLeft: "auto",
                marginRight: "auto",
                justifyContent: "center",
                flexWrap: "nowrap",
              })}
            >
              <Box
                sx={() => ({
                  display: isSmallScreen || isMediumScreen ? "none" : undefined,
                  position: "sticky",
                  top: "60px",
                  height: "calc(100vh - 60px)",
                  maxWidth: "500px",
                  flexGrow: 1,
                  flexShrink: 1,
                  overflowY: "auto",
                })}
              >
                <Box
                  id="claims-list"
                  sx={(theme) => ({
                    overflow: "visible",
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[9]
                        : theme.colors.gray[1],
                    padding: "20px",
                    minHeight: "100%",
                  })}
                >
                  <ClaimsList claims={claims} />
                </Box>
              </Box>
              <Box
                pt="20px"
                sx={() => ({
                  flexGrow: 2,
                  flexShrink: 1,
                  maxWidth:
                    isSmallScreen || isMediumScreen ? undefined : "700px",
                })}
              >
                <Article />
              </Box>
            </Group>
          </Box>
        </Box>
      </ColorSchemeProvider>
    </MantineProvider>
  );
}

export default App;
