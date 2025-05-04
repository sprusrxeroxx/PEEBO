import { 
  Button, 
  Container, 
  Flex, 
  HStack, 
  Text, 
  useColorMode, 
  Box,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  IconButton,
  useColorModeValue
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useAuth } from "../contexts/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";
import { FaBookmark, FaHome, FaUtensils } from "react-icons/fa";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { logout, currentUser } = useAuth();
    const location = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleLogout = async () => {
        try {
            await logout();
            onClose(); // Close drawer if open
        } catch (error) {
            console.error("Failed to log out:", error.message);
        }
    };

    const NavLink = ({ to, icon, children, isMobile = false }) => {
        const isActive = location.pathname === to;
        
        return (
            <Link to={to}>
                <Button
                    variant={isActive ? "solid" : "ghost"}
                    colorScheme={isActive ? "brand" : undefined}
                    bg={isActive ? "brand.primary" : undefined}
                    color={isActive ? "white" : undefined}
                    leftIcon={icon}
                    size={isMobile ? "md" : "sm"}
                    w={isMobile ? "full" : undefined}
                    justifyContent={isMobile ? "flex-start" : undefined}
                    position="relative"
                    transition="all 0.2s ease"
                    _after={isActive ? {
                      content: '""',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      height: '2px',
                      bg: 'brand.primary',
                      transform: 'scaleX(1)',
                      transformOrigin: 'center',
                      transition: 'transform 0.3s ease'
                    } : {
                      content: '""',
                      position: 'absolute',
                      bottom: '0',
                      left: '0',
                      right: '0',
                      height: '2px',
                      bg: 'brand.primary',
                      transform: 'scaleX(0)',
                      transformOrigin: 'center',
                      transition: 'transform 0.3s ease'
                    }}
                    _hover={!isActive && {
                      _after: {
                        transform: 'scaleX(0.7)'
                      }
                    }}
                >
                    {children}
                </Button>
            </Link>
        );
    };

    // Mobile navigation
    const MobileNav = () => (
        <>
            <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                icon={<HamburgerIcon />}
                onClick={onOpen}
                variant="ghost"
            />
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        <Flex align="center">
                            <Icon as={FaUtensils} color="brand.primary" mr={2} boxSize={5} />
                            <Text
                                fontSize="xl"
                                fontWeight="bold"
                                fontFamily="heading"
                                color="brand.primary"
                            >
                                PEEBO
                            </Text>
                        </Flex>
                    </DrawerHeader>

                    <DrawerBody>
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

    // Use color mode values
    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.100", "gray.700");
    const logoColor = useColorModeValue("brand.primary", "brand.secondary");
    const navBgShadow = useColorModeValue("sm", "dark-lg");

    return (
        <Box 
            boxShadow={navBgShadow} 
            bg={bgColor} 
            position="sticky" 
            top={0} 
            zIndex={10}
            borderBottom="1px solid"
            borderColor={borderColor}
        >
            <Container maxW="1140px" px={4}>
                <Flex
                    h={16}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Flex align="center">
                        <Link to="/">
                            <Flex alignItems="center">
                                <Icon as={FaUtensils} color={logoColor} mr={2} boxSize={5} />
                                <Text
                                    fontSize={{ base: "22px", sm: "28px" }}
                                    fontWeight="bold"
                                    fontFamily="heading"
                                    color={logoColor}
                                >
                                    PEEBO
                                </Text>
                            </Flex>
                        </Link>
                        
                        {/* Desktop Navigation Links */}
                        <HStack spacing={4} ml={8} display={{ base: "none", md: "flex" }}>
                            {currentUser && (
                                <>
                                    <NavLink to="/saved-recipes" icon={<Icon as={FaBookmark} />}>
                                        Saved Recipes
                                    </NavLink>
                                </>
                            )}
                        </HStack>
                    </Flex>

                    {/* Mobile Navigation */}
                    <MobileNav />

                    {/* Desktop Right Side Navigation */}
                    <HStack spacing={3} display={{ base: "none", md: "flex" }}>                      
                        {currentUser && (
                                <><Button
                                onClick={toggleColorMode}
                                size="sm"
                                variant="ghost"
                                color="brand.accent"
                                aria-label={colorMode === "light" ? "Switch to dark mode" : "Switch to light mode"}
                            >
                                {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
                            </Button><Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded="full"
                                        variant="link"
                                        cursor="pointer"
                                        minW={0}
                                    >
                                        <Avatar
                                            size="sm"
                                            name={currentUser.email}
                                            bg="brand.primary"
                                            color="white" />
                                    </MenuButton>
                                    <MenuList>
                                        <MenuItem icon={<FaBookmark />} as={Link} to="/saved-recipes">
                                            My Saved Recipes
                                        </MenuItem>
                                        <MenuItem
                                            icon={<IoLogOutOutline />}
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </MenuItem>
                                    </MenuList>
                                </Menu></>
                        )}

                        {!currentUser && (
                            <HStack spacing={2}>
                                <Button
                                    as={Link}
                                    to="/login"
                                    variant="outline"
                                    colorScheme="brand"
                                    size="sm"
                                >
                                    Login
                                </Button>
                                <Button
                                    as={Link}
                                    to="/signup"
                                    variant="primary"
                                    size="sm"
                                >
                                    Sign Up
                                </Button>
                            </HStack>
                        )}
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
};

export default Navbar;