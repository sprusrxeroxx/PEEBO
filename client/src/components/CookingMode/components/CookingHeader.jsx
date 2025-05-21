import {
  ModalHeader,
  Flex,
  Heading,
  IconButton,
  Progress
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useCookingStyles } from "../styles";

function CookingHeader({ title, progress, onClose }) {
  const styles = useCookingStyles();
  
  return (
    <>
      <ModalHeader bg={styles.header.bg} color={styles.header.color} py={4}>
        <Flex justify="space-between" align="center">
          <Heading size="md">{title}</Heading>
          <IconButton
            icon={<CloseIcon />}
            variant="ghost"
            color="white"
            _hover={{ bg: styles.header.buttonBg }}
            onClick={onClose}
            aria-label="Close cooking mode"
          />
        </Flex>
      </ModalHeader>
      
      {/* Progress bar */}
      <Progress 
        value={progress} 
        size="sm" 
        colorScheme={styles.progressBar.color} 
        bg={styles.progressBar.bg}
      />
    </>
  );
}

export default CookingHeader;