import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Link,
  Icon,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useColorModeValue,
  Divider,
  HStack,
  VStack,
  FormErrorMessage
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FaUtensils, FaGoogle, FaGithub } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const { login, signInWithGoogle, signInWithGithub } = useAuth();
  const navigate = useNavigate();

  const formBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const boxShadow = useColorModeValue("sm", "md-dark");
  
  // Background pattern styling
  const bgPattern = useColorModeValue(
    "radial-gradient(circle at 25px 25px, rgba(0,0,0,0.1) 2px, transparent 0)",
    "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.03) 2px, transparent 0)"
  );
  const accentColor = useColorModeValue("brand.primary", "brand.secondary");
  
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    try {
      setIsLoading(true);
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle Google Sign In
  async function handleGoogleSignIn() {
    try {
      setIsLoading(true);
      setError("");
      await signInWithGoogle();
      navigate("/");
    } catch (error) {
      setError("Failed to sign in with Google");
      console.error("Google sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle GitHub Sign In  
  async function handleGithubSignIn() {
    try {
      setIsLoading(true);
      setError("");
      await signInWithGithub();
      navigate("/");
    } catch (error) {
      setError(
        error.message || 'Failed to log in. Please check your credentials and try again.'
      );
      setIsLoading(false);
    }
  }

  return (
    <Box 
      minH="calc(100vh - 80px)" 
      display="flex" 
      alignItems="center" 
      justifyContent="center"
      backgroundImage={bgPattern}
      py={{ base: 8, md: 12 }}
      position="relative"
    >
      {/* Decorative elements */}
      <Box
        position="absolute"
        top="5%"
        right="5%"
        width="250px"
        height="250px"
        bg="brand.primary"
        opacity="0.03"
        borderRadius="full"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="10%"
        left="5%"
        width="200px"
        height="200px"
        bg="brand.secondary"
        opacity="0.05"
        borderRadius="full"
        zIndex={0}
      />

      <Container maxW="md" position="relative" zIndex={1}>
        <Flex 
          direction="column" 
          align="center" 
          mb={6}
        >
          <Icon as={FaUtensils} color={accentColor} boxSize={10} mb={4} />
          <Heading 
            as="h1" 
            size="xl" 
            color={accentColor}
            textAlign="center"
          >
            Welcome Back
          </Heading>
          <Text 
            color={textColor} 
            fontSize="lg" 
            mt={2} 
            fontFamily="body"
            textAlign="center"
          >
            Log in to continue to PEEBO
          </Text>
        </Flex>
        
        <Box 
          p={{ base: 6, md: 8 }}
          borderWidth="1px" 
          borderRadius="lg" 
          boxShadow={boxShadow}
          bg={formBg}
          borderColor={borderColor}
        >
          {/* Social Login Buttons */}
          <VStack spacing={3} mb={6}>
            <Button
              w="full"
              variant="outline"
              leftIcon={<FaGoogle />}
              onClick={handleGoogleSignIn}
              isLoading={isLoading}
              loadingText="Signing in..."
              isDisabled={isLoading}
            >
              Continue with Google
            </Button>
            <Button
              w="full"
              variant="outline"
              leftIcon={<FaGithub />}
              onClick={handleGithubSignIn}
              isLoading={isLoading}
              loadingText="Signing in..."
              isDisabled={isLoading}
            >
              Continue with GitHub
            </Button>
          </VStack>
          
          <Divider my={4} />
          
          {/* Or continue with email */}
          <Text
            fontSize="sm"
            textAlign="center"
            color={textColor}
            mb={4}
          >
            Or continue with email
          </Text>
          
          {/* Error message */}
          {error && (
            <Text 
              color="red.500" 
              fontSize="sm" 
              textAlign="center" 
              mb={4}
            >
              {error}
            </Text>
          )}
          
          {/* Login form */}
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input 
                    type={isOpen ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button 
                      h="1.75rem" 
                      size="sm" 
                      bg="transparent"
                      onClick={onToggle}
                    >
                      {isOpen ? <ViewOffIcon /> : <ViewIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              
              <Button
                type="submit"
                colorScheme="brand"
                variant="primary"
                width="full"
                mt={4}
                isLoading={isLoading && !error}
                loadingText="Logging In"
                fontFamily="heading"
                fontWeight="medium"
                letterSpacing="wide"
              >
                Log In
              </Button>
            </VStack>
          </form>
          
          <Box textAlign="center" mt={4}>
            <Text color={textColor} fontFamily="body">
              Need an account?{" "}
              <Link
                as={RouterLink}
                to="/signup"
                color="brand.primary"
                fontWeight="medium"
                _hover={{
                  textDecoration: "underline",
                }}
              >
                Sign Up
              </Link>
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;