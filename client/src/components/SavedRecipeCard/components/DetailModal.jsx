import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, ModalFooter, Button,
  Image, Box, Heading, Flex, Icon, Text, VStack,
  useColorModeValue
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { FaClock, FaUsers, FaGlobe } from "react-icons/fa";

export default function DetailModal({ 
  isOpen, 
  onClose, 
  recipe, 
  notes,
  isEditing,
  onEditNotes 
}) {
  const textColor = useColorModeValue("gray.700", "gray.300");
  const accentColor = useColorModeValue("brand.primary", "brand.secondary");
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
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
          
          {/* Recipe metadata */}
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
                    {Math.ceil(ingredient.amount)} {ingredient.unit} {ingredient.name}
                  </Text>
                </Flex>
              ))}
              
              {recipe.missingIngredients && recipe.missingIngredients.map((ingredient, idx) => (
                <Flex key={`missing-${idx}`} align="start">
                  <Text as="span" fontSize="sm" mr={2} color="red.500">•</Text>
                  <Text fontSize="sm" color="red.500">
                    {Math.ceil(ingredient.amount)} {ingredient.unit} {ingredient.name} (missing)
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
          
          {/* User Notes */}
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
            onClick={onClose}
          >
            Close
          </Button>
          {!isEditing && (
            <Button
              variant="primary"
              leftIcon={<EditIcon />}
              onClick={onEditNotes}
            >
              Edit Notes
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}