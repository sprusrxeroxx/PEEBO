import React from "react";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Box minH="100vh" bg="brand.light">
      <Navbar />
      <Box as="main" py={{ base: 4, md: 8 }}>
        {children}
      </Box>
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