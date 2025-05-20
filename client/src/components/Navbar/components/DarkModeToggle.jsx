import { IconButton, Button } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useNavbar } from "../useNavbar";

export function DarkModeToggle({ variant = "desktop" }) {
  const { colorMode, toggleColorMode, styles } = useNavbar();
  
  const isLight = colorMode === "light";
  const ariaLabel = isLight ? "Switch to dark mode" : "Switch to light mode";
  const icon = isLight ? <IoMoon /> : <LuSun size="20" />;

  // Floating mobile button variant
  if (variant === "mobile") {
    return (
      <IconButton
        aria-label={ariaLabel}
        icon={isLight ? <IoMoon size={20} /> : <LuSun size={20} />}
        onClick={toggleColorMode}
        position="fixed"
        bottom="24px"
        right="24px"
        size="lg"
        fontSize="20px"
        rounded="full"
        bg={styles.darkModeToggle.floatingBg}
        color={styles.darkModeToggle.floatingColor}
        boxShadow="lg"
        zIndex={20}
        _hover={{
          transform: "scale(1.05)",
        }}
        _active={{
          transform: "scale(0.95)",
        }}
        display={{ base: "flex", md: "none" }}
        transition="all 0.2s"
      />
    );
  }

  // Desktop inline button variant
  return (
    <Button
      onClick={toggleColorMode}
      size="sm"
      variant="ghost"
      color={styles.darkModeToggle.desktopColor}
      aria-label={ariaLabel}
    >
      {icon}
    </Button>
  );
}

export default DarkModeToggle;