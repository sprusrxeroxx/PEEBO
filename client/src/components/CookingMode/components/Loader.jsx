import { Box, useColorModeValue } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";

function Loader() {
  const bgColor = useColorModeValue("#e4e0d7", "gray.700");
  const topBorder = useColorModeValue("#bbb6aa", "gray.600");
  const bottomBorder = useColorModeValue("#bbb6aa", "gray.400");
  const fillColor = useColorModeValue("brand.primary", "accent.primary");
  const beforeBg = useColorModeValue("brand.secondary", "#FFCB80");

  // Define the filling animation
  const loaderAnim = keyframes`
    0% {
      background-size: 100% 0%;
      background-position: bottom;
    }
    100% {
      background-size: 100% 100%;
      background-position: bottom;
    }
  `;

  const afterStyles = {
    content: '""',
    position: "absolute",
    inset: "0",
    padding: "3px 5px",
    borderTop: `1px solid ${topBorder}`,
    borderBottom: `4px solid ${bottomBorder}`,
    backgroundImage: `linear-gradient(${fillColor} 0 0)`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "100% 0%", // Start empty
    backgroundClip: "content-box",
    backgroundColor: bgColor, // fallback base color
    mixBlendMode: "darken",
    animation: `${loaderAnim} 1.5s infinite linear`,
  };

  const beforeStyles = {
    content: '""',
    position: "absolute",
    inset: "-18px calc(50% - 2px) 8px",
    bg: beforeBg,
    transformOrigin: "bottom",
    transform: "rotate(8deg)",
  };

  return (
    <Box
      position="relative"
      w="35px"
      h="80px"
      _after={afterStyles}
      _before={beforeStyles}
    />
  );
}

export default Loader;
