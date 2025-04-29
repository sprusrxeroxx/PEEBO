import { React, useEffect } from 'react';
import {
  Box,
  Text,
  Container,
  Heading,
  VStack,
  Image,
  Flex,
  Icon
} from '@chakra-ui/react';

import { useProductStore } from '../store/product';
import { FaUtensils, FaSeedling, FaBookmark } from 'react-icons/fa';
import RecipeSearch from "../components/RecipeSearch";
import RecipeList from "../components/RecipeList";

const HomePage = () => {
    const { fetchProducts } = useProductStore();

    useEffect(() => {
      fetchProducts()
    }, [fetchProducts])
    
    return (
      <>
        {/* <Box 
          bg="brand.primary" 
          color="white"
          py={12}
          mb={8}
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
                  letterSpacing="normal"
                >
                  Turn your ingredients into amazing meals. Search, save, and cook with confidence.
                </Text>
                
                <Flex mt={8}>
                  <VStack align="center" mr={8}>
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
                  <VStack align="center" mr={8}>
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
                  <VStack align="center">
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
                maxW={{ base: '80%', md: '45%' }}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="2xl"
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
        </Box> */}

        <Container maxW="container.xl" py={4}>
          <Box 
            bg="white" 
            p={8} 
            borderRadius="lg" 
            boxShadow="md"
            mb={12}
          >
            <RecipeSearch />
          </Box>

          {/* Recipe List Section */}
          <RecipeList />
        </Container>
      </>
    );
};

export default HomePage;