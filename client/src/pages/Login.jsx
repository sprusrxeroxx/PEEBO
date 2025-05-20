import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
  Icon
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash, FaUtensils } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
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
    
    try {
      setIsLoading(true);
      await login(email, password);
      navigate('/');
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
                      placeholder="Enter your password"
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
                </FormControl>
                
                <Button
                  type="submit"
                  colorScheme="brand"
                  variant="primary"
                  width="full"
                  mt={4}
                  isLoading={isLoading}
                  loadingText="Logging In"
                  fontFamily="heading"
                  fontWeight="medium"
                  letterSpacing="wide"
                >
                  Log In
                </Button>
              </VStack>
            </form>
            
            <Box textAlign="center" pt={2}>
              <Text color={textColor} fontFamily="body">
                Don't have an account?{" "}
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
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;