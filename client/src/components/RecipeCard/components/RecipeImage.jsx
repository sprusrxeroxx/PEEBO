import { Box, Image, Badge } from "@chakra-ui/react";

export function RecipeImage({ image, title, usedCount, totalCount }) {
  return (
    <Box position="relative" overflow="hidden" flexShrink={0}>
      <Image
        src={image}
        alt={title}
        objectFit="cover"
        w="full"
        h={{ base: "180px", md: "220px" }}
        transition="transform 0.3s ease"
      />
      <Badge 
        position="absolute" 
        top={3} 
        right={3}
        colorScheme="red"
        px={2}
        py={1}
        borderRadius="full"
        fontWeight="bold"
        fontSize="xs"
        letterSpacing="wide"
      >
        {usedCount} / {totalCount} ingredients
      </Badge>
    </Box>
  );
}