import {
  Flex,
  Button,
  Text
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { useCookingStyles } from "../styles";

function NavigationControls({ onPrev, onNext, isFirstStep, isLastStep, isMobile }) {
  const styles = useCookingStyles();
  
  return (
    <>
      {/* Mobile swipe hint */}
      {isMobile && (
        <Text fontSize="sm" textAlign="center" color="gray.500" mt={4} mb={2}>
          Swipe left or right to navigate between steps
        </Text>
      )}
      
      {/* Navigation buttons */}
      <Flex 
        justify="space-between" 
        p={4}
        borderTopWidth="1px"
        borderColor={styles.navigation.border}
        bg={styles.navigation.bg}
      >
        <Button
          leftIcon={<ArrowBackIcon />}
          onClick={onPrev}
          isDisabled={isFirstStep}
          variant="outline"
          colorScheme="brand"
        >
          Previous
        </Button>
        
        <Button
          rightIcon={<ArrowForwardIcon />}
          onClick={onNext}
          variant="primary"
          colorScheme="brand"
        >
          {isLastStep ? "Finish" : "Next"}
        </Button>
      </Flex>
    </>
  );
}

export default NavigationControls;