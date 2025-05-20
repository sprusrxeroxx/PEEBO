import { useColorModeValue } from "@chakra-ui/react";

export function useRecipeStyles() {
  return {
    card: {
      bg: useColorModeValue("white", "gray.800"),
      borderColor: useColorModeValue("gray.100", "gray.700"),
      shadow: "md",
      hoverShadow: "xl",
    },
    text: {
      title: useColorModeValue("gray.800", "white"),
      metadata: useColorModeValue("gray.600", "gray.400"),
      accent: "brand.primary",
      modalTitle: "brand.primary",
      modalSubtitle: "brand.accent"
    },
    modal: {
      bg: useColorModeValue("white", "gray.800"),
      borderColor: useColorModeValue("gray.100", "gray.700")
    }
  };
}