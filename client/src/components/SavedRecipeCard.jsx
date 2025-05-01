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
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { FaClock, FaUtensils } from "react-icons/fa";
import { useRecipeStore } from "../store/recipe";

const SavedRecipeCard = ({ savedRecipe }) => {
  const recipe = savedRecipe.recipeId; // The populated recipe data
  const [notes, setNotes] = useState(savedRecipe.notes || "");
  const [isEditing, setIsEditing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Get the delete function from the store
  const deleteSavedRecipe = useRecipeStore((state) => state.deleteSavedRecipe);
  
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.300");
  
  // Format the date when the recipe was saved
  const savedDate = new Date(savedRecipe.createdAt).toLocaleDateString();

  const handleUpdateNotes = () => {
    // Here you would implement the API call to update notes
    // For now we'll just simulate success
    setIsEditing(false);
    toast({
      title: "Notes updated",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
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
        borderColor="gray.200"
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
          
          {/* Recipe metadata */}
          <HStack mb={3} color="gray.600">
            <Flex align="center">
              <Icon as={FaClock} mr={1} />
              <Text fontSize="xs">30 min</Text>
            </Flex>
            <Flex align="center" ml={3}>
              <Icon as={FaUtensils} mr={1} />
              <Text fontSize="xs">Easy</Text>
            </Flex>
            <Badge colorScheme="blue" fontSize="xs" ml="auto">
              Saved: {savedDate}
            </Badge>
          </HStack>

          {/* User Notes if any */}
          {(notes || isEditing) && (
            <VStack align="start" spacing={1} mb={3}>
              <Flex width="100%" justify="space-between" align="center">
                <Text fontWeight="medium" fontSize="sm" color="brand.primary">
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
                    bg="gray.50"
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
                >
                  <Text fontSize="sm" color={textColor}>
                    {notes || "No notes added yet."}
                  </Text>
                </Box>
              )}
            </VStack>
          )}
          
          {/* View Recipe Button */}
          <Button
            variant="outline"
            colorScheme="brand"
            size="sm"
            width="full"
            mt={3}
            fontFamily="heading"
          >
            View Recipe
          </Button>
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
        <ModalContent>
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
    </>
  );
};

export default SavedRecipeCard;