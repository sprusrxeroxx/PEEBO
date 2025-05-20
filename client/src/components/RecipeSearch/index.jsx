import { 
  VStack,
  Flex,
  Icon,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FaLeaf } from "react-icons/fa";
import { useIngredientTags } from "./hooks/useIngredientTags";
import { useRecipeSearch } from "./hooks/useRecipeSearch";
import IngredientTags from "./components/IngredientTags";
import SearchInput from "./components/SearchInput";
import PopularIngredients from "./components/PopularIngredients";

const RecipeSearch = () => {
  const {
    currentInput,
    ingredientTags,
    error,
    setError,
    inputRef,
    handleInputChange,
    handleKeyDown,
    removeTag,
    addPopularIngredient,
    getFinalIngredients
  } = useIngredientTags();

  const { isSearching, searchRecipes } = useRecipeSearch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const ingredients = getFinalIngredients();
    
    if (ingredients.length === 0) {
      setError("Please enter at least one ingredient");
      return;
    }
    
    await searchRecipes(ingredients);
  };

  return (
    <VStack spacing={{ base: 4, md: 6 }}>
      {/* Header */}
      <Flex align="center" direction={{ base: "column", md: "row" }}>
        <Icon as={FaLeaf} color="brand.secondary" mr={{ base: 0, md: 3 }} mb={{ base: 2, md: 0 }} boxSize={{ base: 5, md: 6 }} />
        <Heading 
          as="h2" 
          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
          fontWeight="bold" 
          color="brand.dark"
          fontFamily="heading"
          letterSpacing="tight"
          textAlign={{ base: "center", md: "left" }}
        >
          What's in Your Kitchen?
        </Heading>
      </Flex>
      
      {/* Description */}
      <Text 
        fontSize={{ base: "sm", md: "md", lg: "lg" }} 
        color="gray.600" 
        textAlign="center" 
        maxW="600px"
        fontFamily="body"
        lineHeight="tall"
        px={{ base: 2, md: 0 }}
      >
        Enter the ingredients you have, separated by commas, and we'll find delicious recipes you can make.
      </Text>
      
      {/* Search Form */}
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '600px' }}>
        <IngredientTags 
          tags={ingredientTags} 
          onRemoveTag={removeTag} 
        />
        
        <SearchInput 
          inputRef={inputRef}
          currentInput={currentInput}
          onInputChange={handleInputChange}
          onKeyDown={handleKeyDown}
          isSearching={isSearching}
          error={error}
          ingredientTags={ingredientTags}
        />
        
        <PopularIngredients 
          onAddIngredient={addPopularIngredient} 
        />
      </form>
    </VStack>
  );
};

export default RecipeSearch;