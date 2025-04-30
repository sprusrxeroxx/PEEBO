import React from "react";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "./Navbar";
import FadeTransition from "./FadeTransition";

const Layout = ({ children }) => {
  return (
    <Box minH="100vh" bg="brand.light">
      <Navbar />
      <FadeTransition>
        <Box as="main" py={{ base: 4, md: 8 }}>
          {children}
        </Box>
      </FadeTransition>
      <Box 
        as="footer" 
        py={6}
        textAlign="center"
        color="gray.600"
        fontSize="sm"
        borderTop="1px solid"
        borderColor="gray.200"
        mt={10}
      >
        © {new Date().getFullYear()} Peebo. All rights reserved.
      </Box>
    </Box>
  );
};

export default Layout;