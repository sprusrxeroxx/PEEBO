import { useAuth } from "../../contexts/AuthContext";
import { useColorMode, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export function useNavbar() {
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  const { currentUser, logout } = useAuth();
  const drawerDisclosure = useDisclosure();

  // Theme-based styling
  const styles = {
    // Navigation container
    navbar: {
      bg: useColorModeValue("white", "gray.800"),
      borderColor: useColorModeValue("gray.100", "gray.700"),
      boxShadow: useColorModeValue("sm", "dark-lg"),
    },
    // Logo and text colors
    branding: {
      color: useColorModeValue("brand.primary", "brand.secondary"),
    },
    // Dark mode button styles
    darkModeToggle: {
      floatingBg: useColorModeValue("brand.primary", "brand.secondary"),
      floatingColor: useColorModeValue("white", "gray.800"),
      desktopColor: "brand.accent",
    },
    // Mobile drawer styles
    drawer: {
      bg: useColorModeValue("white", "gray.800"),
      borderColor: useColorModeValue("gray.100", "gray.700"),
      closeButtonColor: useColorModeValue("gray.800", "gray.100"),
    },
    // Mobile menu button
    mobileMenuButton: {
      color: useColorModeValue("gray.800", "white"),
      hoverBg: useColorModeValue("gray.100", "gray.700"),
    },
    // Logout button
    logoutButton: {
      borderColor: useColorModeValue("red.500", "red.300"),
      color: useColorModeValue("red.600", "red.300"),
      hoverBg: useColorModeValue("red.50", "rgba(254, 178, 178, 0.12)"),
    }
  };

  // Handle user logout
  const handleLogout = async () => {
    try {
      await logout();
      drawerDisclosure.onClose(); // Close drawer if open
    } catch (error) {
      console.error("Failed to log out:", error.message);
    }
  };

  // Check if a route is active
  const isRouteActive = (path) => location.pathname === path;

  return {
    // Auth state
    currentUser,
    
    // Color mode
    colorMode,
    toggleColorMode,
    
    // Drawer state
    isDrawerOpen: drawerDisclosure.isOpen,
    onDrawerOpen: drawerDisclosure.onOpen,
    onDrawerClose: drawerDisclosure.onClose,
    
    // Handlers
    handleLogout,
    isRouteActive,
    
    // Styling
    styles
  };
}