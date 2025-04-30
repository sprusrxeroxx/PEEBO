import React, { useEffect } from "react";
import { Box, Container, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./Navbar";
import FadeTransition from "./FadeTransition";

const Layout = ({ children }) => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("brand.light", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  
  // Update document background color when color mode changes
  useEffect(() => {
    document.body.style.backgroundColor = 
      colorMode === 'dark' ? 'var(--chakra-colors-gray-900)' : 'var(--chakra-colors-brand-light)';
    
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [colorMode]);

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg={bgColor}>
      <Navbar />
      <FadeTransition>
        <Box 
          as="main" 
          py={{ base: 4, md: 8 }}
          flex="1"
          width="100%"
        >
          {children}
        </Box>
      </FadeTransition>
      <Box 
        as="footer" 
        py={{ base: 4, md: 6 }}
        px={4}
        textAlign="center"
        color={textColor}
        fontSize={{ base: "xs", md: "sm" }}
        borderTop="1px solid"
        borderColor={borderColor}
        mt={{ base: 6, md: 10 }}
      >
        <Container maxW="container.xl">
          © {new Date().getFullYear()} Peebo. All rights reserved.
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;