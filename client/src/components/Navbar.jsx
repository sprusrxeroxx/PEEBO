import { 
  Button, 
  Container, 
  Flex, 
  HStack, 
  Text, 
  useColorMode, 
  Link as ChakraLink
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useAuth } from "../contexts/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";

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
        <Container maxW="1140px" px={4} >
            <Flex
                h={16}
                alignItems={'center'}
                justifyContent={'space-between'}
                flexDir={{
                    base: "column",
                    sm: "row"
                }}>
                <Link to="/">
                    <Text
                        fontSize={{ base: "22px", sm: "28px" }}
                        fontWeight={"bold"}
                        textTransform={"uppercase"}
                        textAlign={"center"}
                        bgGradient='linear(to-l, #7928CA, #FF0080)'
                        bgClip='text'
                    >
                        Peebo Store
                    </Text>
                </Link>
                <HStack spacing={2} alignItems={"center"}>
                    <Link to="/create">
                        <Button>
                            <PlusSquareIcon fontSize={20} />
                        </Button>
                    </Link>
                    
                    {currentUser && (
                        <Link to="/saved-recipes">
                            <Button colorScheme="blue">
                                <FaBookmark />
                            </Button>
                        </Link>
                    )}
                    
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
                    </Button>
                    
                    {currentUser && (
                        <Button onClick={handleLogout} colorScheme="red" variant="outline" >
                            <IoLogOutOutline />
                        </Button>
                    )}
                </HStack>
            </Flex>
        </Container>
    );
};

export default Navbar;