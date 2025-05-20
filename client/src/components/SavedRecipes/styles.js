import { useColorModeValue } from "@chakra-ui/react";

export const useRecipeStyles = () => {
  return {
    bgColor: useColorModeValue("white", "gray.800"),
    borderColor: useColorModeValue("gray.100", "gray.700"),
    iconColor: useColorModeValue("gray.300", "gray.600"),
    textColor: useColorModeValue("gray.500", "gray.400"),
    search: {
      iconColor: useColorModeValue("gray.400", "gray.500"),
      bg: useColorModeValue("white", "gray.700"),
      borderColor: useColorModeValue("gray.300", "gray.600"),
      hoverBorderColor: useColorModeValue("gray.400", "gray.500"),
      textColor: useColorModeValue("gray.800", "white"),
      focusBorderColor: useColorModeValue("brand.primary", "brand.secondary")
    }
  };
};