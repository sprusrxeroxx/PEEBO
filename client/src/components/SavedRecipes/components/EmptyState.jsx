import { Box, Text, Button, Icon } from "@chakra-ui/react";
import { FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useRecipeStyles } from "../styles";

const EmptyState = () => {
  const styles = useRecipeStyles();
  
  return (
    <Box 
      textAlign="center" 
      py={10} 
      bg={styles.bgColor} 
      borderRadius="lg" 
      boxShadow="md"
      p={8}
      borderWidth="1px"
      borderColor={styles.borderColor}
    >
      <Icon as={FaBookmark} boxSize={12} mb={6} color={styles.iconColor} />
      <Text fontSize="lg" color={styles.textColor} mb={4}>
        You haven't saved any recipes yet.
      </Text>
      <Button as={Link} to="/" variant="primary" size="md">
        Discover Recipes
      </Button>
    </Box>
  );
};

export default EmptyState;