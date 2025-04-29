import React, { useState } from 'react';
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Card,
  Stack,
  Alert,
  AlertIcon,
  Text,
  Flex,
  Divider,
  Box,
  Icon,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaUtensils } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null); // Clear previous errors

    try {
      await login(email, password);
      navigate('/'); // Redirect to the homepage after login
    } catch (err) {
      setError(err.message); // Display error message
    }
  }

  return (
    <Container maxW="container.sm" py={12}>
      <Card p={8} rounded="lg" boxShadow="lg" bg="white">
        <Stack spacing={6} align="center" mb={8}>
          <Flex 
            bg="brand.primary" 
            w="80px" 
            h="80px" 
            borderRadius="full" 
            align="center" 
            justify="center"
            boxShadow="md"
          >
            <Icon as={FaUtensils} color="white" boxSize={8} />
          </Flex>
          <Heading 
            as="h1" 
            size="xl" 
            textAlign="center"
            color="brand.dark"
          >
            Welcome Back
          </Heading>
          <Text color="gray.600" textAlign="center">
            Sign in to continue to your recipe collections
          </Text>
        </Stack>
        
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel color="gray.700">Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="brand.light"
                borderColor="gray.300"
                focusBorderColor="brand.secondary"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel color="gray.700">Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="brand.light"
                borderColor="gray.300"
                focusBorderColor="brand.secondary"
              />
            </FormControl>
            <Button 
              type="submit" 
              variant="primary"
              size="lg"
              w="full"
              mt={4}
            >
              Sign In
            </Button>
            
            {error && (
              <Alert status="error" rounded="md" mt={4}>
                <AlertIcon />
                {error}
              </Alert>
            )}
            
            <Divider mt={6} mb={4} />
            
            <Flex justifyContent="center">
              <Text mr={1} color="gray.600">New to Peebo?</Text>
              <Link to="/signup">
                <Text
                  as="span"
                  color="brand.primary"
                  fontWeight="medium"
                  _hover={{ textDecoration: "underline" }}
                >
                  Create an account
                </Text>
              </Link>
            </Flex>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}

export default Login;