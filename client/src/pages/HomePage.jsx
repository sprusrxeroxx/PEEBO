import { React, useEffect } from 'react';
import {
  Box,
  Text,
  Container,
  Heading,
  useColorModeValue,
  VStack,
  SimpleGrid
} from '@chakra-ui/react';

import { useProductStore } from '../store/product';

import { Link } from 'react-router-dom';
import Card from '../components/Card.jsx';
import RecipeSearch from "../components/RecipeSearch";
import RecipeList from "../components/RecipeList";

const HomePage = () => {
    const { fetchProducts, products } = useProductStore();

    useEffect(() => {
      fetchProducts()
    }, [fetchProducts])

    const handleSearch = (ingredients) => {
      console.log("Searching for recipes with ingredients:", ingredients);
    };
    
    return (
      <>
        <Container maxW="container.xl" py={12}>
          {/* Welcome Section */}
          {/* <Box overflowX="hidden" bg={useColorModeValue("white", "gray.800")}>
            <Box as="section" py={{ base: 12, sm: 16, lg: 20, xl: 0 }}>
              <Container maxW="7xl" px={4}>
                <Box textAlign="center" maxW="3xl" mx="auto">
                  <Heading
                    mt={5}
                    fontSize={{ base: '4xl', sm: '5xl', lg: '6xl' }}
                    fontWeight="bold"
                    lineHeight="tight"
                  >
                    Welcome To The Peebo Fruits & Basket. 
                  </Heading>
                </Box>
              </Container>
            </Box>
          </Box> */}

          <Box mb={8}>
              <RecipeSearch onSearch={handleSearch} />
          </Box>

          {/* Recipe List Section */}
          <RecipeList />

          {/* Products Section */}
          {/* <VStack spacing={8}>
            <Text
              fontSize={"30"}
              fontWeight={"bold"}
              bgGradient={"linear(to-r, #44BCFF, #FF44EC, #FF675E)"}
              bgClip={"text"}
              textAlign={"center"}
              >
                Current Products
              </Text>
              
            <SimpleGrid 
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={10}
              w={"full"}
              >
                {products.map((product) => (
                  <Card key={product._id} product={product} />
                ))}
              </SimpleGrid>

            {products.length === 0 && (
              <Text
                fontSize="xl"
                textAlign={"center"}
                fontWeight={"bold"}
                color="gray.500"
              >
                No Products Found 😞{" "}
                <Link to={"/create"}>
                  <Text
                    as="span"
                    color="blue.500"
                    _hover={{ textDecoration: "underline" }}
                  >
                    Create a product
                  </Text>
                </Link>
              </Text>
            )}

          </VStack> */}
      </Container>
    </>
  )
}

export default HomePage;