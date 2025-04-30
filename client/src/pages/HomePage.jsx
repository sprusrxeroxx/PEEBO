import { React, useEffect } from 'react';
import {
  Box,
  Text,
  Container,
  Heading,
  VStack,
  Image,
  Flex,
  Icon,
  Grid,
  GridItem,
  Button,
} from '@chakra-ui/react';

import { useProductStore } from '../store/product';
import { FaUtensils, FaSeedling, FaBookmark, FaSearch } from 'react-icons/fa';
import RecipeSearch from "../components/RecipeSearch";
import RecipeList from "../components/RecipeList";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useRecipeStore } from '../store/recipe';

const HomePage = () => {
    const { fetchProducts } = useProductStore();
    const { currentUser } = useAuth();
    const recipes = useRecipeStore((state) => state.recipes);
    
    useEffect(() => {
      fetchProducts();
    }, [fetchProducts]);
    
    return (
      <>
        <Box 
          bg="brand.primary" 
          color="white"
          py={{ base: 3, md: 4 }}
          mb={{ base: 8, md: 12 }}
        >
          <Container maxW="container.lg">
            <Flex 
              direction={{ base: 'column', md: 'row' }}
              align="center"
              justify="space-between"
            >
              <Box maxW={{ base: '100%', md: '50%' }} mb={{ base: 8, md: 0 }}>
                <Heading 
                  as="h1" 
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  fontWeight="bold"
                  mb={4}
                  color="white"
                  letterSpacing="tight"
                  lineHeight="shorter"
                >
                  Find Delicious Recipes With What You Have
                </Heading>
                <Text 
                  fontSize={{ base: "md", md: "lg" }} 
                  mb={6}
                  fontFamily="body"
                  lineHeight="tall"
                >
                  Turn your ingredients into amazing meals. Search, save, and cook with confidence.
                </Text>
                
                <Flex mt={8} wrap="wrap">
                  <VStack align="center" mr={8} mb={4}>
                    <Icon as={FaUtensils} boxSize={6} mb={2} />
                    <Text 
                      fontWeight="semibold"
                      fontFamily="heading"
                      fontSize="sm"
                      letterSpacing="wide"
                    >
                      Easy Recipes
                    </Text>
                  </VStack>
                  <VStack align="center" mr={8} mb={4}>
                    <Icon as={FaSeedling} boxSize={6} mb={2} />
                    <Text 
                      fontWeight="semibold"
                      fontFamily="heading"
                      fontSize="sm"
                      letterSpacing="wide"
                    >
                      Fresh Ideas
                    </Text>
                  </VStack>
                  <VStack align="center" mb={4}>
                    <Icon as={FaBookmark} boxSize={6} mb={2} />
                    <Text 
                      fontWeight="semibold"
                      fontFamily="heading"
                      fontSize="sm"
                      letterSpacing="wide"
                    >
                      Save Favorites
                    </Text>
                  </VStack>
                </Flex>
              </Box>
              
              <Box 
                maxW={{ base: '90%', md: '45%' }}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="2xl"
                display={{ base: recipes.length > 0 ? 'none' : 'block', md: 'block' }}
              >
                <Image 
                  src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" 
                  alt="Delicious food" 
                  objectFit="cover"
                  borderRadius="lg"
                />
              </Box>
            </Flex>
          </Container>
        </Box>

        <Container maxW="container.xl" py={4}>
          <Box 
            bg="white" 
            p={{ base: 6, md: 8 }}
            borderRadius="lg" 
            boxShadow="md"
            mb={{ base: 8, md: 12 }}
            transform={{ base: "translateY(0)", md: "translateY(-40px)" }}
            position="relative"
            zIndex={1}
          >
            <RecipeSearch />
          </Box>

          {recipes && recipes.length > 0 ? (
            <RecipeList />
          ) : (
            <Grid 
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={8} 
              my={8}
            >
              <GridItem colSpan={1}>
                <Box 
                  p={6} 
                  bg="white" 
                  borderRadius="md" 
                  boxShadow="md" 
                  textAlign="center"
                >
                  <Icon as={FaSearch} boxSize={10} mb={4} color="brand.secondary" />
                  <Heading as="h3" size="md" mb={3} fontFamily="heading">
                    Search Recipes
                  </Heading>
                  <Text mb={4} color="gray.600">
                    Enter ingredients you have to find matching recipes
                  </Text>
                </Box>
              </GridItem>
              
              <GridItem colSpan={1}>
                <Box 
                  p={6} 
                  bg="white" 
                  borderRadius="md" 
                  boxShadow="md" 
                  textAlign="center"
                >
                  <Icon as={FaUtensils} boxSize={10} mb={4} color="brand.primary" />
                  <Heading as="h3" size="md" mb={3} fontFamily="heading">
                    Cook With Ease
                  </Heading>
                  <Text mb={4} color="gray.600">
                    Follow simple instructions to create delicious meals
                  </Text>
                </Box>
              </GridItem>
              
              <GridItem colSpan={1}>
                <Box 
                  p={6} 
                  bg="white" 
                  borderRadius="md" 
                  boxShadow="md" 
                  textAlign="center"
                >
                  <Icon as={FaBookmark} boxSize={10} mb={4} color="brand.accent" />
                  <Heading as="h3" size="md" mb={3} fontFamily="heading">
                    Save Favorites
                  </Heading>
                  <Text mb={4} color="gray.600">
                    Keep your best recipes for future reference
                  </Text>
                  {currentUser && (
                    <Button 
                      as={Link} 
                      to="/saved-recipes" 
                      variant="accent" 
                      size="sm" 
                      mt={2}
                    >
                      View Saved Recipes
                    </Button>
                  )}
                </Box>
              </GridItem>
            </Grid>
          )}
        </Container>
      </>
    );
};

export default HomePage;