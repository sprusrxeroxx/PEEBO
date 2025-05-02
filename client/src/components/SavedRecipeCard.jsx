import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  useColorModeValue,
  Badge,
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  ModalFooter,
  HStack,
  Icon,
  Textarea,
  useToast,
  Tag,
  TagLabel,
  TagLeftIcon,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { FaClock, FaUtensils, FaUsers, FaFireAlt, FaLeaf, FaGlobe } from "react-icons/fa";
import { useRecipeStore } from "../store/recipe";

const SavedRecipeCard = ({ savedRecipe }) => {
  const recipe = savedRecipe.recipeId; // The populated recipe data
  const [notes, setNotes] = useState(savedRecipe.notes || "");
  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Modal for viewing detailed recipe info
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  
  // Get the delete function from the store
  const deleteSavedRecipe = useRecipeStore((state) => state.deleteSavedRecipe);
  const updateRecipeNotes = useRecipeStore((state) => state.updateRecipeNotes);
  
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const accentColor = useColorModeValue("brand.primary", "brand.secondary");
  
  // Format the date when the recipe was saved
  const savedDate = new Date(savedRecipe.createdAt).toLocaleDateString();

  const handleUpdateNotes = async () => {
    try {
      const { success, message } = await updateRecipeNotes(savedRecipe._id, notes);
      
      if (success) {
        setIsEditing(false);
        toast({
          title: "Notes updated",
          description: message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      } else {
        toast({
          title: "Error",
          description: message || "Failed to update notes",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const { success, message } = await deleteSavedRecipe(savedRecipe._id);
      
      if (success) {
        toast({
          title: "Recipe deleted",
          description: message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      } else {
        toast({
          title: "Error",
          description: message || "Failed to delete recipe",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      }
      
      onClose(); // Close the confirmation modal
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Box
        bg={cardBg}
        shadow="md"
        rounded="lg"
        overflow="hidden"
        transition="all 0.3s"
        _hover={{ transform: "translateY(-6px)", shadow: "xl" }}
        borderWidth="1px"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        position="relative"
      >
        {/* Recipe Image */}
        <Box position="relative">
          <Image
            src={recipe.image}
            alt={recipe.title}
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
            onClick={onOpen}
            aria-label="Delete recipe"
          />
        </Box>

        {/* Recipe Details */}
        <Box p={5}>
          {/* Recipe Title */}
          <Heading 
            as="h3" 
            size="md" 
            mb={2} 
            color={textColor}
            noOfLines={2}
            height="48px"
          >
            {recipe.title}
          </Heading>
          
          {/* Recipe metadata - now with enriched data */}
          <HStack mb={3} spacing={4} color="gray.600">
            <Flex align="center">
              <Icon as={FaClock} mr={1} />
              <Text fontSize="xs">{recipe.readyInMinutes} min</Text>
            </Flex>
            <Flex align="center">
              <Icon as={FaUsers} mr={1} />
              <Text fontSize="xs">{recipe.servings} servings</Text>
            </Flex>
            <Badge colorScheme="blue" fontSize="xs" ml="auto">
              Saved: {savedDate}
            </Badge>
          </HStack>

          {/* Display dish types if available */}
          {recipe.dishTypes && recipe.dishTypes.length > 0 && (
            <Box mb={3}>
              <Wrap spacing={2}>
                {recipe.dishTypes.slice(0, 2).map((dish, idx) => (
                  <WrapItem key={idx}>
                    <Tag size="sm" colorScheme="green" variant="subtle">
                      <TagLeftIcon as={FaUtensils} boxSize="10px" />
                      <TagLabel fontSize="xs" textTransform="capitalize">{dish}</TagLabel>
                    </Tag>
                  </WrapItem>
                ))}
                {recipe.dishTypes.length > 2 && (
                  <WrapItem>
                    <Tag size="sm" variant="subtle">
                      <TagLabel fontSize="xs">+{recipe.dishTypes.length - 2} more</TagLabel>
                    </Tag>
                  </WrapItem>
                )}
              </Wrap>
            </Box>
          )}

          {/* User Notes if any */}
          {(notes || isEditing) && (
            <VStack align="start" spacing={1} mb={3}>
              <Flex width="100%" justify="space-between" align="center">
                <Text fontWeight="medium" fontSize="sm" color={accentColor}>
                  Your Notes:
                </Text>
                <IconButton
                  icon={isEditing ? <DeleteIcon /> : <EditIcon />}
                  size="xs"
                  variant="ghost"
                  onClick={() => setIsEditing(!isEditing)}
                  aria-label={isEditing ? "Cancel editing" : "Edit notes"}
                />
              </Flex>
              
              {isEditing ? (
                <Box width="100%">
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    size="sm"
                    resize="vertical"
                    bg={useColorModeValue("gray.50", "gray.700")}
                    color={useColorModeValue("gray.700", "gray.100")}
                    placeholder="Add your notes here..."
                    mb={2}
                  />
                  <Button 
                    size="xs" 
                    colorScheme="blue" 
                    onClick={handleUpdateNotes}
                  >
                    Save Notes
                  </Button>
                </Box>
              ) : (
                <Box
                  p={2}
                  bg={useColorModeValue("gray.50", "gray.700")}
                  borderRadius="md"
                  w="full"
                  borderWidth="1px"
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                >
                  <Text fontSize="sm" color={textColor}>
                    {notes || "No notes added yet."}
                  </Text>
                </Box>
              )}
            </VStack>
          )}
          
          {/* Action Buttons */}
          <HStack mt={3} spacing={2}>
            <Button
              variant="outline"
              colorScheme="brand"
              size="sm"
              width="full"
              onClick={onDetailOpen}
              leftIcon={<ExternalLinkIcon />}
              fontFamily="heading"
            >
              View Recipe
            </Button>
          </HStack>
        </Box>
      </Box>

      {/* Confirmation Modal for Delete */}
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        isCentered 
        size="sm"
        motionPreset="slideInBottom"
      >
        <ModalOverlay 
          bg="blackAlpha.300"
          backdropFilter="blur(5px)"
        />
        <ModalContent
          bg={useColorModeValue("white", "gray.800")}
          borderColor={useColorModeValue("gray.100", "gray.700")}
        >
          <ModalHeader color="brand.primary">Remove Recipe</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to remove "{recipe.title}" from your saved recipes?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="ghost" 
              mr={3} 
              onClick={onClose} 
              isDisabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              colorScheme="red" 
              onClick={handleDelete} 
              isLoading={isDeleting}
              loadingText="Removing"
            >
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Detailed Recipe View Modal */}
      <Modal 
        isOpen={isDetailOpen} 
        onClose={onDetailClose} 
        size="xl"
        scrollBehavior="inside"
      >
        <ModalOverlay 
          bg="blackAlpha.300"
          backdropFilter="blur(5px)"
        />
        <ModalContent
          bg={useColorModeValue("white", "gray.800")}
          borderColor={useColorModeValue("gray.100", "gray.700")}
        >
          <ModalHeader color={accentColor}>{recipe.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
              src={recipe.image}
              alt={recipe.title}
              objectFit="cover"
              w="full"
              borderRadius="md"
              mb={6}
            />
            
            {/* Recipe metadata in detail view */}
            <Flex 
              mb={6} 
              wrap="wrap" 
              gap={4} 
              justifyContent="space-between"
              bg={useColorModeValue("gray.50", "gray.700")}
              p={4}
              borderRadius="md"
            >
              <Flex align="center">
                <Icon as={FaClock} mr={2} color={accentColor} />
                <Box>
                  <Text fontWeight="bold" fontSize="sm">Cooking Time</Text>
                  <Text>{recipe.readyInMinutes} minutes</Text>
                </Box>
              </Flex>
              
              <Flex align="center">
                <Icon as={FaUsers} mr={2} color={accentColor} />
                <Box>
                  <Text fontWeight="bold" fontSize="sm">Servings</Text>
                  <Text>{recipe.servings}</Text>
                </Box>
              </Flex>
              
              {recipe.cuisines && recipe.cuisines.length > 0 && (
                <Flex align="center">
                  <Icon as={FaGlobe} mr={2} color={accentColor} />
                  <Box>
                    <Text fontWeight="bold" fontSize="sm">Cuisine</Text>
                    <Text>{recipe.cuisines.join(", ")}</Text>
                  </Box>
                </Flex>
              )}
            </Flex>
            
            {/* Recipe description */}
            {recipe.description && (
              <Box mb={6}>
                <Heading as="h3" size="md" mb={2} color={accentColor}>
                  About
                </Heading>
                <Box 
                  dangerouslySetInnerHTML={{ __html: recipe.description }}
                  fontSize="sm"
                  color={textColor}
                  sx={{
                    "& a": { color: accentColor, textDecoration: "underline" },
                    "& b": { fontWeight: "bold" }
                  }}
                />
              </Box>
            )}

            {/* Ingredients */}
            <Box mb={6}>
              <Heading as="h3" size="md" mb={3} color={accentColor}>
                Ingredients
              </Heading>
              <VStack align="start" spacing={1} pl={2}>
                {recipe.ingredients.map((ingredient, idx) => (
                  <Flex key={idx} align="start">
                    <Text as="span" fontSize="sm" mr={2}>•</Text>
                    <Text fontSize="sm">
                      {ingredient.amount} {ingredient.unit} {ingredient.name}
                    </Text>
                  </Flex>
                ))}
                
                {recipe.missingIngredients && recipe.missingIngredients.map((ingredient, idx) => (
                  <Flex key={`missing-${idx}`} align="start">
                    <Text as="span" fontSize="sm" mr={2} color="red.500">•</Text>
                    <Text fontSize="sm" color="red.500">
                      {ingredient.amount} {ingredient.unit} {ingredient.name} (missing)
                    </Text>
                  </Flex>
                ))}
              </VStack>
            </Box>
            
            {/* Instructions */}
            {recipe.instructions && (
              <Box mb={6}>
                <Heading as="h3" size="md" mb={3} color={accentColor}>
                  Instructions
                </Heading>
                <Box 
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                  fontSize="sm"
                  color={textColor}
                  sx={{
                    "& ol": { paddingLeft: "1.5rem" },
                    "& li": { marginBottom: "0.5rem" }
                  }}
                />
              </Box>
            )}
            
            {/* Your Notes */}
            {notes && (
              <Box mb={6}>
                <Heading as="h3" size="md" mb={3} color={accentColor}>
                  Your Notes
                </Heading>
                <Box
                  p={3}
                  bg={useColorModeValue("gray.50", "gray.700")}
                  borderRadius="md"
                  borderWidth="1px"
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                >
                  <Text fontSize="sm">{notes}</Text>
                </Box>
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={onDetailClose}
            >
              Close
            </Button>
            {!isEditing && (
              <Button
                variant="primary"
                leftIcon={<EditIcon />}
                onClick={() => {
                  onDetailClose();
                  setIsEditing(true);
                }}
              >
                Edit Notes
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SavedRecipeCard;