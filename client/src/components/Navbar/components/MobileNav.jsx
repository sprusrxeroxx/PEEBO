import {
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Flex,
  Icon,
  Text,
  Button
} from "@chakra-ui/react";
import { HamburgerIcon, AddIcon } from "@chakra-ui/icons";
import { FaUtensils, FaBookmark } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavbar } from "../useNavbar";
import NavLink from "./NavLink";

function MobileNav() {
  const { 
    currentUser, 
    isDrawerOpen, 
    onDrawerOpen, 
    onDrawerClose, 
    handleLogout,
    styles 
  } = useNavbar();
  
  return (
    <>
      <IconButton
        display={{ base: "flex", md: "none" }}
        aria-label="Open menu"
        icon={<HamburgerIcon />}
        onClick={onDrawerOpen}
        variant="ghost"
        color={styles.mobileMenuButton.color}
        _hover={{
          bg: styles.mobileMenuButton.hoverBg
        }}
      />
      
      <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent
          bg={styles.drawer.bg}
          borderRightColor={styles.drawer.borderColor}
          boxShadow="lg"
        >
          <DrawerCloseButton color={styles.drawer.closeButtonColor} />
          <DrawerHeader 
            borderBottomWidth="1px" 
            borderBottomColor={styles.drawer.borderColor}
          >
            <Flex align="center">
              <Icon 
                as={FaUtensils} 
                color={styles.branding.color} 
                mr={2} 
                boxSize={5} 
              />
              <Text
                fontSize="xl"
                fontWeight="bold"
                fontFamily="heading"
                color={styles.branding.color}
              >
                PEEBO
              </Text>
            </Flex>
          </DrawerHeader>

          <DrawerBody bg={styles.drawer.bg}>
            <VStack align="stretch" spacing={4} mt={4}>
              {currentUser && (
                <>
                  <NavLink to="/saved-recipes" icon={<Icon as={FaBookmark} />} isMobile>
                    Saved Recipes
                  </NavLink>
                  <Button
                    variant="outline"
                    colorScheme="red"
                    leftIcon={<IoLogOutOutline />}
                    onClick={handleLogout}
                    w="full"
                    justifyContent="flex-start"
                    borderColor={styles.logoutButton.borderColor}
                    color={styles.logoutButton.color}
                    _hover={{
                      bg: styles.logoutButton.hoverBg
                    }}
                  >
                    Logout
                  </Button>
                </>
              )}
              
              {!currentUser && (
                <>
                  <NavLink to="/login" icon={<Icon as={FaUtensils} />} isMobile>
                    Login
                  </NavLink>
                  <NavLink to="/signup" icon={<AddIcon />} isMobile>
                    Sign Up
                  </NavLink>
                </>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MobileNav;