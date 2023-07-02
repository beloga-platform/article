import { useMediaQuery } from "@mantine/hooks";

export default function useIsSmallScreen() {
  return useMediaQuery("(max-width:768px)");
}
