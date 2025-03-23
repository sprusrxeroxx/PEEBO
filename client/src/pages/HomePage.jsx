import React from 'react';
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
  useColorModeValue
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const HomePage = () => {
    const isLargeScreen = useBreakpointValue({ base: false, lg: true });
    return (
        <Box overflowX="hidden" bg={useColorModeValue("white", "gray.800")}>
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
  
          <Box mt={{ base: 16, md: 20 }}>
            <Image
              src="https://unsplash.com/photos/teal-and-orange-pineapple-decor-rhUU1pemhQ0"
              alt=""
              objectFit="cover"
              objectPosition="top"
              w="full"
              h="auto"
              mx="auto"
              transform="scale(1.5)"
              _xl={{ transform: 'scale(1)' }}
              maxW="2xl"
            />
          </Box>
        </Box>
      </Box>
    )
}

export default HomePage