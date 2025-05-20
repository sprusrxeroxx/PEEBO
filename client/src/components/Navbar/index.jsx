import { Box, Container, Flex, HStack } from "@chakra-ui/react";
import { useNavbar } from "./useNavbar";
import Logo from "./components/Logo";
import MobileNav from "./components/MobileNav";
import DesktopNav from "./components/DesktopNav";
import DarkModeToggle from "./components/DarkModeToggle";

function Navbar() {
  const { styles, currentUser } = useNavbar();

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
              {/* Left side navigation links */}
              <DesktopNav.LeftSide />
            </Flex>

            {/* Mobile menu button */}
            <MobileNav />

            {/* Right side navigation */}
            <DesktopNav.RightSide />
          </Flex>
        </Container>
      </Box>
      
      {/* Floating Dark Mode Button (Mobile Only) */}
      <DarkModeToggle variant="mobile" />
    </>
  );
}

export default Navbar;