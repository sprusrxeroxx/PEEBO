import React from "react";
import { Box, Container, Flex } from "@chakra-ui/react";
import { useNavbar } from "./useNavbar";
import Logo from "./components/Logo";
import MobileNav from "./components/MobileNav";
import DesktopNav from "./components/DesktopNav";
import DarkModeToggle from "./components/DarkModeToggle";

function Navbar() {
  const { styles } = useNavbar();

  return (
    <>
      <Box 
        boxShadow={styles.navbar.boxShadow}
        bg={styles.navbar.bg}
        position="sticky"
        top={0}
        zIndex={10}
        borderBottom="1px solid"
        borderColor={styles.navbar.borderColor}
      >
        <Container maxW="1140px" px={4}>
          <Flex
            h={16}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* Logo and left-side navigation */}
            <Flex align="center">
              <Logo />
            </Flex>
            <DesktopNav />
            {/* Mobile navigation */}
            <MobileNav />
          </Flex>
        </Container>
      </Box>
      
      {/* Floating Dark Mode Button (Mobile Only) */}
      <DarkModeToggle variant="mobile" />
    </>
  );
}

export default Navbar;