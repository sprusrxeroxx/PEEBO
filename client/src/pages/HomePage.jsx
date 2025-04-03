import { React, useEffect } from 'react';
import {
  Box,
  Flex,
  Image,
  Button,
  Text,
  Container,
  Heading,
  HStack,
  IconButton,
  useBreakpointValue,
  useColorModeValue,
  VStack,
  SimpleGrid
} from '@chakra-ui/react';

import { useProductStore } from '../store/product';

import { Link } from 'react-router-dom';
import Card from '../components/Card.jsx';

const HomePage = () => {
    const { fetchProducts, products } = useProductStore();

    useEffect(() => {
      fetchProducts()
    }, [fetchProducts])

    console.log(products);
    
    return (
      <>
        <Container maxW="container.xl" py={12}>
          {/* <Box overflowX="hidden" bg={useColorModeValue("white", "gray.800") }>
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
                  <Text maxW="md" mx="auto" mt={6} lineHeight="3" fontFamily={"cursive"}>
                    The home of evergreen juicy fruits and veggies.
                  </Text>
      
                  <Box position="relative" display="inline-flex" mt={10} _group={{}}>
                    <Box
                      position="absolute"
                      transition="all"
                      duration="1000ms"
                      opacity="0.7"
                      inset="-1px"
                      bgGradient="linear(to-r, #44BCFF, #FF44EC, #FF675E)"
                      borderRadius="xl"
                      filter="blur(lg)"
                      _groupHover={{ opacity: '1', inset: '-2px', duration: '200ms' }}
                      animation="tilt 10s infinite linear"
                    />
                    <Button
                      position="relative"
                      px={8}
                      py={4}
                      fontSize="lg"
                      fontWeight="bold"
                      color="white"
                      bg="gray.900"
                      borderRadius="xl"
                      _focus={{ outline: 'none', ring: '2px', ringOffset: '2px', ringColor: 'gray.900' }}
                    >
                      With over 1000+ produce to choose from
                    </Button>
                  </Box>
                </Box>
              </Container>
               */}
          <VStack spacing={8}>
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

            {products.lenth === 0 && (<Text fontSize="xl" textAlign={"center"} fontWeight={"bold"} color='gray.500'>
              No Products Found {" "}
              <Link to={'/create'}>
                <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                  Create a product
                </Text>
              </Link>
            </Text>)}

          </VStack>
      </Container>
    </>
  )
}

export default HomePage