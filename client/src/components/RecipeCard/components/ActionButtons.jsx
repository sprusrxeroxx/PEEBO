import { Flex, Button } from "@chakra-ui/react";
import { FaBookmark } from "react-icons/fa";

export function ActionButtons({ onViewDetails, onSaveRecipe, isSaving }) {
  return (
    <Flex mt="auto" pt={3} justifyContent="space-between">
      <Button 
        onClick={onViewDetails}
        variant="outline"
        colorScheme="teal"
        size={{ base: "xs", md: "sm" }}
        flex="1"
        mr={2}
        fontFamily="heading"
        fontWeight="medium"
        letterSpacing="wide"
      >
        View Details
      </Button>
      <Button
        leftIcon={<FaBookmark />}
        variant="primary"
        size={{ base: "xs", md: "sm" }}
        onClick={onSaveRecipe}
        isLoading={isSaving}
        loadingText="Saving"
        flex="1"
        fontFamily="heading"
        fontWeight="medium"
        letterSpacing="wide"
      >
        Save
      </Button>
    </Flex>
  );
}