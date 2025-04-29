import React, { useState } from "react";
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  Image, 
  Button,
  useToast,
  Flex,
  Badge,
  HStack,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from "@chakra-ui/react";
import { useAuth } from "../contexts/AuthContext";
import { useRecipeStore } from "../store/recipe";
import { FaBookmark, FaClock, FaUtensils } from "react-icons/fa";

const RecipeCard = ({ recipe }) => {
  const [isSaving, setIsSaving] = useState(false);
  const { currentUser } = useAuth();
  const saveRecipe = useRecipeStore((state) => state.saveRecipe);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const handleSaveRecipe = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please login to save recipes",
        status: "warning",
        isClosable: true,
      });
      return;
    }

    setIsSaving(true);
    
    // Use the user's Firebase ID from Auth context
    const userId = currentUser.uid;
    
    const { success, message } = await saveRecipe(userId, recipe);
    
    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      isClosable: true,
      duration: 3000,
      position: "top"
    });
    
    setIsSaving(false);
  };

  return (
    <>
      <Box
        bg="white"
        shadow="md"
        rounded="lg"    
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-6px)", shadow: "xl" }}
        borderWidth="1px"
        borderColor="gray.100"
      >
        {/* Recipe Image */}
        <Box position="relative">
          <Image
            src={recipe.image}
            alt={recipe.title}
            objectFit="cover"
            w="full"
            h="220px"
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
          >
            {recipe.usedIngredientCount} / {recipe.usedIngredientCount + recipe.missedIngredientCount} ingredients
          </Badge>
        </Box>

        {/* Recipe Details */}
        <Box p={5}>
          {/* Recipe Title */}
          <Heading 
            as="h3" 
            size="md" 
            mb={3} 
            color="brand.dark"
            noOfLines={2}
            height="50px"
            display="flex"
            alignItems="center"
          >
            {recipe.title}
          </Heading>

          <HStack mb={4} color="gray.600">
            <Flex align="center">
              <Icon as={FaClock} mr={1} />
              <Text fontSize="sm">30 min</Text>
            </Flex>
            <Flex align="center" ml={4}>
              <Icon as={FaUtensils} mr={1} />
              <Text fontSize="sm">Easy</Text>
            </Flex>
          </HStack>

          {/* Missing Ingredients */}
          <Text fontWeight="medium" color="brand.primary" mb={2} fontSize="sm">
            Missing ingredients: {recipe.missedIngredientCount}
          </Text>

          {/* Action Buttons */}
          <Flex mt={4} justifyContent="space-between">
            <Button 
              onClick={onOpen}
              variant="outline"
              colorScheme="teal"
              size="sm"
              flex="1"
              mr={2}
            >
              View Details
            </Button>
            <Button
              leftIcon={<FaBookmark />}
              variant="primary"
              size="sm"
              onClick={handleSaveRecipe}
              isLoading={isSaving}
              loadingText="Saving"
              flex="1"
            >
              Save
            </Button>
          </Flex>
        </Box>
      </Box>

      {/* Recipe Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="brand.primary">{recipe.title}</ModalHeader>
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
            
            <Box mb={4}>
              <Heading as="h4" size="md" color="brand.accent" mb={2}>
                Missing Ingredients:
              </Heading>
              <VStack align="start" spacing={1}>
                {recipe.missedIngredients.map((ingredient) => (
                  <Flex key={ingredient.id} align="start">
                    <Text fontSize="sm" color="brand.dark">
                      • {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            </Box>
            
            <Box mb={4}>
              <Heading as="h4" size="md" color="brand.accent" mb={2}>
                Ingredients You Already Have:
              </Heading>
              <VStack align="start" spacing={1}>
                {recipe.usedIngredients.map((ingredient) => (
                  <Flex key={ingredient.id} align="start">
                    <Text fontSize="sm" color="brand.dark">
                      • {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="secondary" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button 
              variant="primary" 
              leftIcon={<FaBookmark />}
              onClick={() => {
                handleSaveRecipe();
                onClose();
              }}
              isLoading={isSaving}
            >
              Save Recipe
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RecipeCard;