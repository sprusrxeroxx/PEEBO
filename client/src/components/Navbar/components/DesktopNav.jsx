import { HStack, Icon, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { useNavbar } from "../useNavbar";
import NavLink from "./NavLink";
import UserMenu from "./UserMenu";
import DarkModeToggle from "./DarkModeToggle";

// Left side navigation component
function LeftSide() {
  const { currentUser } = useNavbar();
  
  if (!currentUser) return null;
  
  return (
    <HStack spacing={4} ml={8} display={{ base: "none", md: "flex" }}>
      <NavLink to="/saved-recipes" icon={<Icon as={FaBookmark} />}>
        Saved Recipes
      </NavLink>
    </HStack>
  );
}

// Right side navigation component
function RightSide() {
  const { currentUser } = useNavbar();
  
  return (
    <HStack spacing={3} display={{ base: "none", md: "flex" }}>
      {currentUser && (
        <>
          <DarkModeToggle />
          <UserMenu />
        </>
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
  );
}

// Export both components as properties of DesktopNav
const DesktopNav = {
  LeftSide,
  RightSide
};

export default DesktopNav;