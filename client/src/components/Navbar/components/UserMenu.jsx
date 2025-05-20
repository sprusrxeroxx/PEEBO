import React from "react";
import { 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  Button, 
  Avatar,
  Icon 
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavbar } from "../useNavbar";

function UserMenu() {
  const { currentUser, handleLogout } = useNavbar();
  
  if (!currentUser) return null;
  
  return (
    <Menu>
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
          color="white" 
        />
      </MenuButton>
      <MenuList>
        <MenuItem 
          icon={<Icon as={FaBookmark} />} 
          as={Link} 
          to="/saved-recipes"
        >
          My Saved Recipes
        </MenuItem>
        <MenuItem
          icon={<Icon as={IoLogOutOutline} />}
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UserMenu;