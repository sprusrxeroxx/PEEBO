import { Box, Image, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export default function RecipeImage({ image, title, onDelete }) {
  return (
    <Box position="relative">
      <Image
        src={image}
        alt={title}
        objectFit="cover"
        w="full"
        h="200px"
      />
      <IconButton
        icon={<DeleteIcon />}
        colorScheme="red"
        variant="solid"
        size="sm"
        position="absolute"
        top={2}
        right={2}
        opacity={0.8}
        onClick={onDelete}
        aria-label="Delete recipe"
      />
    </Box>
  );
}