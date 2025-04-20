import React, { useState } from 'react';
import {
  Container,
  Heading,
  form,
  FormControl,
  FormLabel,
  Input,
  Button,
  Card,
  useColorModeValue,
  Stack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useAuth } from '../contexts/AuthContext';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { signup } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    
    signup(email, password)
  }

  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.300');

  return (
    <Container maxW={"container.sm"}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
            Sign Up
        </Heading>
        <Card p={6} rounded="md" boxShadow="md" bg={cardBg} color={textColor}>
        <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
            <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password" >
                <FormLabel>Password</FormLabel>
                <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>
            <Button type="submit" colorScheme="blue">
                Sign Up
            </Button>
            {error && (
                <Alert status="error">
                <AlertIcon />
                {error}
                </Alert>
            )}
            </Stack>
        </form>
        </Card>
    </Container>
  );
}
export default SignUp;