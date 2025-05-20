import { VStack, Center, Spinner } from "@chakra-ui/react";
import useSavedRecipesData from "./hooks/useSavedRecipesData";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import EmptyState from "./components/EmptyState";
import RecipeGrid from "./components/RecipeGrid";

const SavedRecipes = () => {
  const {
    isLoading,
    savedRecipes,
    filteredRecipes,
    searchTerm,
    setSearchTerm
  } = useSavedRecipesData();

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <Center py={10}>
        <Spinner size="xl" color="brand.primary" />
      </Center>
    );
  }

  return (
    <VStack spacing={8} align="stretch" w="full" py={8}>
      <Header />
      
      {!savedRecipes || savedRecipes.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <SearchBar 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          <RecipeGrid 
            filteredRecipes={filteredRecipes} 
            searchTerm={searchTerm} 
          />
        </>
      )}
    </VStack>
  );
};

export default SavedRecipes;