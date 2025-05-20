import React, { useEffect } from "react";
import { Box, Container, useColorMode, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./Navbar/index.jsx";
import FadeTransition from "./FadeTransition";

const Layout = ({ children }) => {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("bg.primary", "gray.900");
  const borderColor = useColorModeValue("border.subtle", "gray.700");
  const textColor = useColorModeValue("text.secondary", "gray.400");
  
  // Update document background color when color mode changes
  useEffect(() => {
    // Add a class to the document element for easier global dark mode styling
    if (colorMode === 'dark') {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    
    // Update document background color when color mode changes
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