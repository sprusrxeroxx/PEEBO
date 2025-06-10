import { useState } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  VStack, 
  Heading, 
  Text, 
  Alert, 
  AlertIcon,
  Link,
  Container,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  IconButton,
  Flex,
  Icon,
  Divider
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash, FaUtensils, FaGoogle, FaGithub } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signup, signInWithGoogle, signInWithGithub, signInAnonymously } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isUpgradeFlow = location.state?.upgradeAnonymous;

  // Color mode values
  const textColor = useColorModeValue("gray.800", "gray.100");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const formBg = useColorModeValue("white", "gray.800");
  const boxShadow = useColorModeValue("lg", "dark-lg");
  const bgPattern = useColorModeValue(
    "radial-gradient(circle at 25px 25px, rgba(0,0,0,0.02) 2px, transparent 0)",
    "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.03) 2px, transparent 0)"
  );
  const accentColor = useColorModeValue("brand.primary", "brand.secondary");

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    
    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setIsLoading(true);
      await signup(email, password);
      navigate('/');
    } catch (error) {
      setError(
        error.message || 'Failed to create an account. Please try again.'
      );
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
      setError("Failed to sign in with GitHub");
      console.error("GitHub sign-in error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Add this new handler for anonymous sign-in
  async function handleAnonymousSignIn() {
    try {
      setIsLoading(true);
      setError("");
      await signInAnonymously();
      navigate("/");
    } catch (error) {
      setError("Failed to continue as guest");
      console.error("Anonymous sign-in error:", error);
    } finally {
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
        bottom="5%"
        right="5%"
        width="250px"
        height="250px"
        bg="brand.secondary"
        opacity="0.05"
        borderRadius="full"
        zIndex={0}
      />
      <Box
        position="absolute"
        top="10%"
        left="5%"
        width="200px"
        height="200px"
        bg="brand.primary"
        opacity="0.03"
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
          {isUpgradeFlow ? (
            <>
              <Heading 
                as="h1" 
                size="xl" 
                color={accentColor}
                textAlign="center"
              >
                Create Your Account
              </Heading>
              <Text 
                color={textColor} 
                fontSize="lg" 
                mt={2} 
                fontFamily="body"
                textAlign="center"
              >
                Create an account to save recipes and more
              </Text>
            </>
          ) : (
            <>
              <Heading 
                as="h1" 
                size="xl" 
                color={accentColor}
                textAlign="center"
              >
                Create an Account
              </Heading>
              <Text 
                color={textColor} 
                fontSize="lg" 
                mt={2} 
                fontFamily="body"
                textAlign="center"
              >
                Join PEEBO to discover delicious recipes
              </Text>
            </>
          )}
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
              loadingText="Signing up..."
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
              loadingText="Signing up..."
              isDisabled={isLoading}
            >
              Continue with GitHub
            </Button>
            <Button
              w="full"
              variant="ghost"
              onClick={handleAnonymousSignIn}
              isLoading={isLoading}
              loadingText="Signing in..."
              isDisabled={isLoading}
            >
              Try Without Account
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
          
          <VStack spacing={6} align="stretch">
            {error && (
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                {error}
              </Alert>
            )}
            
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel fontFamily="heading" color={textColor}>Email</FormLabel>
                  <Input 
                    type="email" 
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    bg={useColorModeValue("gray.50", "gray.700")}
                    borderColor={borderColor}
                    color={textColor}
                    _hover={{
                      borderColor: useColorModeValue("gray.300", "gray.500")
                    }}
                    _focus={{
                      borderColor: "brand.secondary",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-secondary)",
                    }}
                    fontFamily="body"
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel fontFamily="heading" color={textColor}>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      bg={useColorModeValue("gray.50", "gray.700")}
                      borderColor={borderColor}
                      color={textColor}
                      _hover={{
                        borderColor: useColorModeValue("gray.300", "gray.500")
                      }}
                      _focus={{
                        borderColor: "brand.secondary",
                        boxShadow: "0 0 0 1px var(--chakra-colors-brand-secondary)",
                      }}
                      fontFamily="body"
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <Text fontSize="xs" color={useColorModeValue("gray.500", "gray.400")} mt={1}>
                    Password must be at least 6 characters long
                  </Text>
                </FormControl>
                
                <Button
                  type="submit"
                  colorScheme="brand"
                  variant="primary"
                  width="full"
                  mt={4}
                  isLoading={isLoading}
                  loadingText="Creating Account"
                  fontFamily="heading"
                  fontWeight="medium"
                  letterSpacing="wide"
                >
                  Sign Up
                </Button>
              </VStack>
            </form>
            
            <Box textAlign="center" pt={2}>
              <Text color={textColor} fontFamily="body">
                Already have an account?{" "}
                <Link
                  as={RouterLink}
                  to="/login"
                  color="brand.primary"
                  fontWeight="medium"
                  _hover={{
                    textDecoration: "underline",
                  }}
                >
                  Log In
                </Link>
              </Text>
            </Box>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default SignUp;