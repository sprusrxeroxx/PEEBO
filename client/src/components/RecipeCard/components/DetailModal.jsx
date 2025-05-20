import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Button,
  Box,
  Heading,
  VStack,
  Flex,
  Text
} from "@chakra-ui/react";
import { FaBookmark } from "react-icons/fa";
import { useRecipeStyles } from "../styles";

// Ingredient list sub-component
function IngredientList({ title, ingredients, headingColor }) {
  return (
    <Box mb={4}>
      <Heading 
        as="h4" 
        size="sm" 
        color={headingColor} 
        mb={2}
        fontFamily="heading"
        fontWeight="semibold"
        letterSpacing="tight"
      >
        {title}:
      </Heading>
      <VStack align="start" spacing={1}>
        {ingredients.map((ingredient) => (
          <Flex key={ingredient.id} align="start">
            <Text 
              fontSize="sm" 
              fontFamily="body"
              lineHeight="tall"
            >
              • {Math.ceil(ingredient.amount)} {ingredient.unit} {ingredient.name}
            </Text>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
}

export function DetailModal({ isOpen, onClose, recipe, onSaveRecipe, isSaving }) {
  const styles = useRecipeStyles();
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="lg"
      motionPreset="slideInBottom"
    >
      <ModalOverlay 
        bg="blackAlpha.300"
        backdropFilter="blur(5px)"
      />
      <ModalContent
        border="1px solid"
        borderColor={styles.modal.borderColor}
        bg={styles.modal.bg}
      >
        <ModalHeader 
          fontFamily="heading" 
          fontWeight="bold" 
          color={styles.text.modalTitle}
          letterSpacing="tight"
        >
          {recipe.title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image
            src={recipe.image}
            alt={recipe.title}
            objectFit="cover"
            w="full"
            h="250px"
            borderRadius="md"
            mb={4}
          />
          
          <IngredientList 
            title="Missing Ingredients"
            ingredients={recipe.missedIngredients}
            headingColor={styles.text.modalSubtitle}
          />
          
          <IngredientList 
            title="Ingredients You Already Have"
            ingredients={recipe.usedIngredients}
            headingColor={styles.text.modalSubtitle}
          />
        </ModalBody>
        <ModalFooter>
          <Button 
            variant="secondary" 
            mr={3} 
            onClick={onClose}
            fontFamily="heading"
            fontWeight="medium"
            letterSpacing="wide"
          >
            Close
          </Button>
          <Button 
            variant="primary" 
            leftIcon={<FaBookmark />}
            onClick={onSaveRecipe}
            isLoading={isSaving}
            fontFamily="heading"
            fontWeight="medium"
            letterSpacing="wide"
          >
            Save Recipe
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}