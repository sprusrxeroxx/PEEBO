import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { useNavbar } from "../useNavbar";

function NavLink({ to, icon, children, isMobile = false }) {
  const { isRouteActive } = useNavbar();
  const isActive = isRouteActive(to);
  
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
}

export default NavLink;