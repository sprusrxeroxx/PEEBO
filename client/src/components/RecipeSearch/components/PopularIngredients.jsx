import React from "react";
import { 
  Box, 
  Flex, 
  Divider, 
  Text, 
  Wrap, 
  WrapItem,
  Tag, 
  TagLabel, 
  Icon
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { POPULAR_INGREDIENTS } from "../constants";
import { useRecipeSearchStyles } from "../styles";

const PopularIngredients = ({ onAddIngredient }) => {
  const styles = useRecipeSearchStyles();

  return (
    <Box mt={6}>
      <Flex align="center" mb={3}>
        <Divider flex="1" borderColor={styles.divider} />
        <Text
          px={3}
          fontSize="xs"
          fontWeight="medium"
          color={styles.text.hint}
          textTransform="uppercase"
          letterSpacing="wider"
        >
          Popular Ingredients
        </Text>
        <Divider flex="1" borderColor={styles.divider} />
      </Flex>
      
      <Wrap spacing={2}>
        {POPULAR_INGREDIENTS.map((ingredient) => (
          <WrapItem key={ingredient.name}>
            <Tag 
              size="sm" 
              borderRadius="full" 
              variant="subtle" 
              bg={styles.suggestion.bg} 
              color={styles.suggestion.color}
              cursor="pointer"
              _hover={{ 
                bg: styles.suggestion.hoverBg,
                transform: "translateY(-1px)"
              }}
              transition="all 0.2s"
              onClick={() => onAddIngredient(ingredient.name)}
            >
              {ingredient.icon && (
                <Box mr={1}>
                  <Icon 
                    as={ingredient.icon} 
                    boxSize="10px" 
                    color={styles.suggestion.iconColor} 
                  />
                </Box>
              )}
              <TagLabel fontSize="xs">{ingredient.name}</TagLabel>
              <Box ml={1}>
                <AddIcon boxSize="8px" color={styles.suggestion.iconColor} />
              </Box>
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};

export default PopularIngredients;