import {
  VStack, Flex, Text, IconButton, Box, Button,
  Textarea, useColorModeValue
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

export default function RecipeNotes({ notes, isEditing, setIsEditing, setNotes, onSave }) {
  const accentColor = useColorModeValue("brand.primary", "brand.secondary");
  const textColor = useColorModeValue("gray.700", "gray.300");
  
  if (!notes && !isEditing) return null;
  
  return (
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
            onClick={onSave}
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
  );
}