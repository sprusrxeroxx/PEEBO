import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Image
} from "@chakra-ui/react";
import { useCookingStyles } from "../styles";

function StepContent({ step, index, totalSteps, image, isFirstStep }) {
  const styles = useCookingStyles();
  
  return (
    <Flex direction="column" h="full">
      {/* Recipe image at the top of the first step */}
      {isFirstStep && image && (
        <Box mb={6}>
          <Image
            src={image}
            alt="Recipe"
            borderRadius="md"
            objectFit="cover"
            w="full"
            h="200px"
          />
        </Box>
      )}
      
      {/* Step instruction */}
      <Box
        flex="1"
        bg={styles.stepContent.bg}
        borderRadius="lg"
        p={6}
        boxShadow="md"
        borderWidth="1px"
        borderColor={styles.stepContent.border}
      >
        <Flex align="center" mb={4}>
          <Flex
            align="center"
            justify="center"
            bg={styles.stepContent.stepNumberBg}
            color="white"
            borderRadius="full"
            w={10}
            h={10}
            mr={4}
            fontWeight="bold"
          >
            {step.number || index + 1}
          </Flex>
          <Heading size="md" color={styles.stepContent.title}>
            {index === 0 ? "Let's start cooking!" : `Step ${step.number || index + 1}`}
          </Heading>
        </Flex>
        
        <Text fontSize="lg" color={styles.stepContent.text} lineHeight="tall">
          {step.instruction}
        </Text>
        
        {/* Ingredients for this step */}
        {step.ingredients && step.ingredients.length > 0 && (
          <VStack align="start" mt={6} spacing={2}>
            <Text fontWeight="medium" color={styles.metadataTitle}>
              Ingredients for this step:
            </Text>
            {step.ingredients.map((ingredient, idx) => (
              <Text key={idx} fontSize="sm">
                • {ingredient.name}
              </Text>
            ))}
          </VStack>
        )}
        
        {/* Equipment for this step */}
        {step.equipment && step.equipment.length > 0 && (
          <VStack align="start" mt={4} spacing={2}>
            <Text fontWeight="medium" color={styles.metadataTitle}>
              Equipment needed:
            </Text>
            {step.equipment.map((item, idx) => (
              <Text key={idx} fontSize="sm">
                • {item.name}
              </Text>
            ))}
          </VStack>
        )}
      </Box>
    </Flex>
  );
}

export default StepContent;