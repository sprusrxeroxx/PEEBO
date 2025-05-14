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
  ModalFooter,
  useColorModeValue
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
        duration: 3000,
        position: "top",
        variant: "subtle",
        animation: "ease-in",
        icon: <Icon as={FaBookmark} />,
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
      position: "top",
      variant: "subtle",
      icon: success ? <Icon as={FaBookmark} /> : undefined,
    });
    
    setIsSaving(false);
  };

  return (
    <>
      <Box
        bg={useColorModeValue("white", "gray.800")}
        shadow="md"
        rounded="lg"    
        overflow="hidden"
        transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        _hover={{ 
          transform: "translateY(-6px)", 
          shadow: "xl",
          "& img": { transform: "scale(1.05)" } 
        }}
        borderWidth="1px"
        borderColor={useColorModeValue("gray.100", "gray.700")}
        h="100%"
        display="flex"
        flexDirection="column"
      >
        {/* Recipe Image */}
        <Box position="relative" overflow="hidden" flexShrink={0}>
          <Image
            src={recipe.image}
            alt={recipe.title}
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
            {recipe.usedIngredientCount} / {recipe.usedIngredientCount + recipe.missedIngredientCount} ingredients
          </Badge>
        </Box>

        {/* Recipe Details */}
        <Box p={{ base: 4, md: 5 }} flex="1" display="flex" flexDirection="column">
          {/* Recipe Title */}
          <Heading 
            as="h3" 
            fontSize={{ base: "md", md: "lg" }}
            mb={3} 
            noOfLines={2}
            minHeight={{ base: "40px", md: "50px" }}
            display="flex"
            alignItems="center"
            fontFamily="heading"
            fontWeight="bold"
            letterSpacing="tight"
          >
            {recipe.title}
          </Heading>

          <HStack mb={4} color="gray.600">
            <Flex align="center">
              <Icon as={FaClock} mr={1} />
              <Text fontSize="sm" fontFamily="body">{(recipe.usedIngredientCount + recipe.missedIngredientCount)*5} mins</Text>
            </Flex>
            <Flex align="center" ml={4}>
              <Icon as={FaUtensils} mr={1} />
              <Text fontSize="sm" fontFamily="body">Easy</Text>
            </Flex>
          </HStack>

          {/* Missing Ingredients */}
          <Text 
            fontWeight="medium" 
            color="brand.primary" 
            mb={2} 
            fontSize="sm"
            fontFamily="heading"
            letterSpacing="wide"
          >
            Missing ingredients: {recipe.missedIngredientCount}
          </Text>

          {/* Action Buttons */}
          <Flex mt="auto" pt={3} justifyContent="space-between">
            <Button 
              onClick={onOpen}
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
              onClick={handleSaveRecipe}
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
        </Box>
      </Box>

      {/* Recipe Details Modal */}
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
          borderColor={useColorModeValue("gray.100", "gray.700")}
          bg={useColorModeValue("white", "gray.800")}
        >
          <ModalHeader 
            fontFamily="heading" 
            fontWeight="bold" 
            color="brand.primary"
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
            
            <Box mb={4}>
              <Heading 
                as="h4" 
                size="sm" 
                color="brand.accent" 
                mb={2}
                fontFamily="heading"
                fontWeight="semibold"
                letterSpacing="tight"
              >
                Missing Ingredients:
              </Heading>
              <VStack align="start" spacing={1}>
                {recipe.missedIngredients.map((ingredient) => (
                  <Flex key={ingredient.id} align="start">
                    <Text 
                      fontSize="sm" 
                      variant="ingredient"
                      fontFamily="body"
                      lineHeight="tall"
                    >
                      • {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            </Box>
            
            <Box mb={4}>
              <Heading 
                as="h4" 
                size="sm" 
                color="brand.accent" 
                mb={2}
                fontFamily="heading"
                fontWeight="semibold"
                letterSpacing="tight"
              >
                Ingredients You Already Have:
              </Heading>
              <VStack align="start" spacing={1}>
                {recipe.usedIngredients.map((ingredient) => (
                  <Flex key={ingredient.id} align="start">
                    <Text 
                      fontSize="sm" 
                      fontFamily="body"
                      lineHeight="tall"
                    >
                      • {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </Text>
                  </Flex>
                ))}
              </VStack>
            </Box>
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
              onClick={() => {
                handleSaveRecipe();
                onClose();
              }}
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
    </>
  );
};

export default RecipeCard;