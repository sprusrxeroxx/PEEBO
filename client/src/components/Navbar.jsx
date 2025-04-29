import { 
  Button, 
  Container, 
  Flex, 
  HStack, 
  Text, 
  useColorMode, 
  Box,
  Icon
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useAuth } from "../contexts/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";
import { FaBookmark, FaUtensils } from "react-icons/fa";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { logout, currentUser } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Failed to log out:", error.message);
        }
    };

    return (
        <Box boxShadow="sm" bg="white" position="sticky" top={0} zIndex={10}>
            <Container maxW="1140px" px={4}>
                <Flex
                    h={16}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    flexDir={{
                        base: "column",
                        sm: "row"
                    }}>
                    <Link to="/">
                        <Flex alignItems="center">
                            <Icon as={FaUtensils} color="brand.primary" mr={2} boxSize={5} />
                            <Text
                                fontSize={{ base: "22px", sm: "28px" }}
                                fontWeight={"bold"}
                                fontFamily="heading"
                                color="brand.primary"
                            >
                                PEEBO
                            </Text>
                        </Flex>
                    </Link>
                    <HStack spacing={3} alignItems={"center"}>
                        {currentUser && (
                            <>
                                <Link to="/create">
                                    <Button variant="accent" size="sm" leftIcon={<AddIcon />}>
                                        Add Recipe
                                    </Button>
                                </Link>
                                
                                <Link to="/saved-recipes">
                                    <Button variant="secondary" size="sm" leftIcon={<FaBookmark />}>
                                        Saved
                                    </Button>
                                </Link>
                            </>
                        )}
                        
                        <Button 
                            onClick={toggleColorMode} 
                            size="sm"
                            variant="ghost"
                            color="brand.accent"
                        >
                            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
                        </Button>
                        
                        {currentUser && (
                            <Button 
                                onClick={handleLogout} 
                                variant="outline" 
                                size="sm"
                                borderColor="brand.primary"
                                color="brand.primary"
                                leftIcon={<IoLogOutOutline />}
                            >
                                Logout
                            </Button>
                        )}
                    </HStack>
                </Flex>
            </Container>
        </Box>
    );
};

export default Navbar;