import { Box, Heading, HStack, Flex, Icon, Text } from "@chakra-ui/react";
import { FaClock, FaUtensils } from "react-icons/fa";
import { useRecipeStyles } from "../styles";

export function RecipeDetails({ title, cookTime, difficulty, missingCount }) {
  const styles = useRecipeStyles();
  
  return (
    <>
      <Heading 
        as="h3" 
        fontSize={{ base: "md", md: "lg" }}
        mb={3} 
        noOfLines={2}
        minHeight={{ base: "40px", md: "50px" }}
        fontFamily="heading"
        fontWeight="bold"
        letterSpacing="tight"
        color={styles.text.title}
      >
        {title}
      </Heading>

      <HStack mb={4} color={styles.text.metadata}>
        <Flex align="center">
          <Icon as={FaClock} mr={1} />
          <Text fontSize="sm" fontFamily="body">{cookTime} mins</Text>
        </Flex>
        <Flex align="center" ml={4}>
          <Icon as={FaUtensils} mr={1} />
          <Text fontSize="sm" fontFamily="body">{difficulty}</Text>
        </Flex>
      </HStack>

      <Text 
        fontWeight="medium" 
        color={styles.text.accent}
        mb={2} 
        fontSize="sm"
        fontFamily="heading"
        letterSpacing="wide"
      >
        Missing ingredients: {missingCount}
      </Text>
    </>
  );
}