import { useColorModeValue } from "@chakra-ui/react";

export function useCookingStyles() {
  return {
    header: {
      bg: useColorModeValue("brand.primary", "brand.secondary"),
      color: "white",
      buttonBg: "whiteAlpha.300"
    },
    stepIndicator: {
      bg: useColorModeValue("gray.50", "gray.700"),
      border: useColorModeValue("gray.200", "gray.600"),
      text: useColorModeValue("gray.700", "gray.300")
    },
    stepContent: {
      bg: useColorModeValue("white", "gray.800"),
      border: useColorModeValue("gray.100", "gray.700"),
      title: useColorModeValue("brand.primary", "brand.secondary"),
      text: useColorModeValue("gray.700", "gray.300"),
      stepNumberBg: useColorModeValue("brand.primary", "brand.secondary")
    },
    navigation: {
      bg: useColorModeValue("white", "gray.800"),
      border: useColorModeValue("gray.200", "gray.600")
    },
    metadataTitle: useColorModeValue("brand.primary", "brand.secondary"),
    progressBar: {
      bg: useColorModeValue("gray.100", "gray.700"),
      color: "brand"
    }
  };
}