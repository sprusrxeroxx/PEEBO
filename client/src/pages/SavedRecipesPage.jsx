import { Container } from "@chakra-ui/react";
import SavedRecipes from "../components/SavedRecipes/index.jsx";

const SavedRecipesPage = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <SavedRecipes />
    </Container>
  );
};

export default SavedRecipesPage;