import { Box, Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useRecipeStyles } from "../styles";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const styles = useRecipeStyles();
  
  return (
    <Box mb={6} maxW="500px" mx="auto" w="full">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} color={styles.search.iconColor} />
        </InputLeftElement>
        <Input
          placeholder="Search your saved recipes"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg={styles.search.bg}
          borderColor={styles.search.borderColor}
          color={styles.search.textColor}
          _hover={{
            borderColor: styles.search.hoverBorderColor,
          }}
          _focus={{
            borderColor: "brand.secondary",
            boxShadow: `0 0 0 1px var(--chakra-colors-brand-secondary)`,
          }}
          focusBorderColor={styles.search.focusBorderColor}
        />
      </InputGroup>
    </Box>
  );
};

export default SearchBar;