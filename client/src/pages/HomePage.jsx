import {
  Box,
  Text,
  Container,
  Heading,
  VStack,
  Icon,
  Grid,
  GridItem,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';

import { FaUtensils, FaSeedling, FaBookmark, FaSearch } from 'react-icons/fa';
import RecipeSearch from "../components/RecipeSearch/index";
import RecipeList from "../components/RecipeList";
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useRecipeStore } from '../store/recipe';

const HomePage = () => {
    const { currentUser } = useAuth();
    const recipes = useRecipeStore((state) => state.recipes);
    return (
      <>
        {/* Simplified Hero Section */}
        <Box 
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("brand.dark", "white")}
          pt={{ base: 16, md: 24 }}
          pb={{ base: 10, md: 16 }}
          borderBottom="1px"
          borderColor={useColorModeValue("gray.100", "gray.700")}
          position="relative"
          overflow="hidden"
        >
          {/* Elegant subtle background pattern */}
          <Box
            position="absolute"
            top="0"
            right="0"
            height="300px"
            width="300px"
            bg="brand.primary"
            opacity="0.03"
            borderBottomLeftRadius="100%"
            zIndex="0"
          />
          
          <Box
            position="absolute"
            top="10%"
            left="-5%"
            height="200px"
            width="200px"
            borderRadius="full"
            bg="brand.secondary"
            opacity="0.03"
            zIndex="0"
          />
          
          <Box
            position="absolute"
            bottom="-5%"
            right="15%"
            height="150px"
            width="150px"
            borderRadius="full"
            bg="brand.accent"
            opacity="0.03"
            zIndex="0"
          />
          
          {/* Subtle dotted pattern */}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            backgroundImage={useColorModeValue(
              "radial-gradient(circle at 25px 25px, rgba(0,0,0,0.02) 2px, transparent 0)",
              "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.03) 2px, transparent 0)"
            )}
            backgroundSize="50px 50px"
            zIndex="0"
          />
          
          <Container maxW="container.md" position="relative" zIndex="1">
            <VStack spacing={{ base: 8, md: 10 }} align="center" textAlign="center">
              <Heading 
                as="h1" 
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                fontWeight="bold"
                letterSpacing="tight"
                lineHeight="1.1"
              >
                Cook With What You <Box as="span" color="brand.primary">Already Have</Box>
              </Heading>
              
              <Text
                fontSize={{ base: "lg", md: "xl" }}
                color="gray.600"
                maxW="600px"
                lineHeight="tall"
              >
                Transform everyday ingredients into delicious meals in minutes
              </Text>
              
              <Box 
                pt={{ base: 4, md: 6 }} 
                w={{ base: "100%", md: "75%" }} 
                maxW="500px"
                position="relative"
                zIndex="2"
              >
                <RecipeSearch />
              </Box>
            </VStack>
          </Container>
        </Box>

        <Container maxW="container.xl" py={{ base: 10, md: 16 }}>
          {recipes && recipes.length > 0 ? (
            <RecipeList />
          ) : (
            <>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl" }}
                textAlign="center"
                mb={10}
                fontFamily="heading"
                color="brand.dark"
              >
                How It Works
              </Heading>
              
              <Grid 
                templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                gap={8} 
              >
                <GridItem colSpan={1}>
                  <Box 
                    p={{ base: 6, md: 8 }}
                    bg={useColorModeValue("white", "gray.800")}
                    borderRadius="lg" 
                    boxShadow="md" 
                    textAlign="center"
                    height="100%"
                    transition="transform 0.2s"
                    _hover={{ transform: "translateY(-5px)" }}
                    borderWidth="1px"
                    borderColor={useColorModeValue("gray.100", "gray.700")}
                  >
                    <Icon as={FaSearch} boxSize={10} mb={6} color="brand.secondary" />
                    <Heading as="h3" size="md" mb={4} fontFamily="heading">
                      Enter Your Ingredients
                    </Heading>
                    <Text color="gray.600">
                      Tell us what you have in your kitchen pantry or refrigerator
                    </Text>
                  </Box>
                </GridItem>
                
                <GridItem colSpan={1}>
                  <Box 
                    p={{ base: 6, md: 8 }}
                    bg={useColorModeValue("white", "gray.800")}
                    borderRadius="lg" 
                    boxShadow="md" 
                    textAlign="center"
                    height="100%"
                    transition="transform 0.2s"
                    _hover={{ transform: "translateY(-5px)" }}
                    borderWidth="1px"
                    borderColor={useColorModeValue("gray.100", "gray.700")}
                  >
                    <Icon as={FaUtensils} boxSize={10} mb={6} color="brand.primary" />
                    <Heading as="h3" size="md" mb={4} fontFamily="heading">
                      Get Recipe Matches
                    </Heading>
                    <Text color="gray.600">
                      Discover personalized recipe suggestions based on what you have
                    </Text>
                  </Box>
                </GridItem>
                
                <GridItem colSpan={1}>
                  <Box 
                    p={{ base: 6, md: 8 }}
                    bg={useColorModeValue("white", "gray.800")}
                    borderRadius="lg" 
                    boxShadow="md" 
                    textAlign="center"
                    height="100%"
                    transition="transform 0.2s"
                    _hover={{ transform: "translateY(-5px)" }}
                    borderWidth="1px"
                    borderColor={useColorModeValue("gray.100", "gray.700")}
                  >
                    <Icon as={FaBookmark} boxSize={10} mb={6} color="brand.accent" />
                    <Heading as="h3" size="md" mb={4} fontFamily="heading">
                      Save Your Favorites
                    </Heading>
                    <Text color="gray.600" mb={currentUser ? 4 : 0}>
                      Keep track of recipes you love for easy access later
                    </Text>
                    {currentUser && (
                      <Button 
                        as={Link} 
                        to="/saved-recipes" 
                        variant="accent" 
                        size="sm" 
                        mt={4}
                      >
                        Your Recipe Collection
                      </Button>
                    )}
                  </Box>
                </GridItem>
              </Grid>
            </>
          )}
        </Container>
      </>
    );
};

export default HomePage;