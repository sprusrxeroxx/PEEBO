import { useColorModeValue } from "@chakra-ui/react";

export const useRecipeSearchStyles = () => {
  return {
    tag: {
      bg: useColorModeValue("brand.primary", "brand.secondary"),
      color: "white",
    },
    text: {
      hint: useColorModeValue("gray.500", "gray.400"),
    },
    suggestion: {
      bg: useColorModeValue("gray.100", "gray.700"),
      hoverBg: useColorModeValue("gray.200", "gray.600"),
      color: useColorModeValue("gray.700", "gray.300"),
      iconColor: useColorModeValue("brand.primary", "brand.secondary"),
    },
    divider: useColorModeValue("gray.200", "gray.700"),
    input: {
      bg: useColorModeValue("brand.light", "gray.700"),
      borderColor: useColorModeValue("gray.300", "gray.600"),
      hoverBorderColor: useColorModeValue("brand.secondary", "brand.secondary"),
      focusBorderColor: useColorModeValue("brand.secondary", "brand.secondary"),
      color: useColorModeValue("gray.800", "white"),
      error: {
        borderColor: useColorModeValue("red.300", "red.500"),
        focusBorderColor: useColorModeValue("red.400", "red.300"),
      }
    }
  };
};