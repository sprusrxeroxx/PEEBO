import React from "react";
import { Box, HStack, TagLabel, TagCloseButton } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Tag } from "@chakra-ui/react";
import { tagVariants } from "../constants";
import { useRecipeSearchStyles } from "../styles";

const MotionTag = motion(Tag);

const IngredientTags = ({ tags, onRemoveTag }) => {
  const styles = useRecipeSearchStyles();
  
  if (tags.length === 0) {
    return <Box mb={2} minHeight="40px" />;
  }

  return (
    <Box mb={2} minHeight="40px">
      <HStack spacing={2} flexWrap="wrap">
        {tags.map((tag) => (
          <MotionTag 
            size="md" 
            key={tag} 
            borderRadius="full" 
            variant="solid" 
            bg={styles.tag.bg} 
            color={styles.tag.color}
            my={1}
            variants={tagVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            layout
          >
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => onRemoveTag(tag)} />
          </MotionTag>
        ))}
      </HStack>
    </Box>
  );
};

export default IngredientTags;