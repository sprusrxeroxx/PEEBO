import {
  Flex,
  HStack,
  Icon,
  Text,
  Badge
} from "@chakra-ui/react";
import { FaClock, FaUtensils } from "react-icons/fa";
import { useCookingStyles } from "../styles";

function StepMetadata({ currentStep, currentStepIndex, totalSteps, readyInMinutes, servings }) {
  const styles = useCookingStyles();
  
  return (
    <Flex 
      bg={styles.stepIndicator.bg} 
      py={2} 
      px={4} 
      justify="space-between" 
      align="center"
      borderBottomWidth="1px"
      borderColor={styles.stepIndicator.border}
    >
      <Badge colorScheme="brand" fontSize="sm">
        Step {currentStep.number || currentStepIndex + 1} of {totalSteps}
      </Badge>
      
      <HStack spacing={4}>
        <Flex align="center">
          <Icon as={FaClock} mr={1} color={styles.metadataTitle} />
          <Text fontSize="sm">{readyInMinutes} min</Text>
        </Flex>
        <Flex align="center">
          <Icon as={FaUtensils} mr={1} color={styles.metadataTitle} />
          <Text fontSize="sm">{servings} servings</Text>
        </Flex>
      </HStack>
    </Flex>
  );
}

export default StepMetadata;