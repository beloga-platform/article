import { useMediaQuery } from "@mantine/hooks";

export default function useIsMediumScreen() {
  return useMediaQuery("(max-width: 991px)");
}
