import {
  Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, ModalFooter,
  Button, Text, useColorModeValue
} from "@chakra-ui/react";

export default function DeleteModal({ 
  isOpen, onClose, onDelete, title, isDeleting 
}) {
  return (
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
            Are you sure you want to remove "{title}" from your saved recipes?
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
            onClick={onDelete} 
            isLoading={isDeleting}
            loadingText="Removing"
          >
            Remove
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}