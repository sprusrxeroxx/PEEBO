import { Box, Button, Container, Heading, Input, useColorModeValue, VStack } from '@chakra-ui/react';
import { useState } from 'react';

const CreatePage = () => {
    const [ newProduct, setNewProduct ] = useState({
        name: "",
        price: "",
        image: "",
    });

    return <Container maxW={"container.sm"}>
        <VStack
            spacing={8}
        >
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create New Product
            </Heading>

            <Box
            w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"} >
                <VStack spacing={4}>
                    <Input 
                        placeholder='Product Name'
                        name='name'
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />

                    <Input 
                        placeholder='Price'
                        name='price'
                        type='number'
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    />

                    <Input 
                        placeholder='Image URL'
                        name='image'
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    />

                    <Button
                        position="relative"
                        px={8}
                        py={4}
                        fontSize="lg"
                        fontWeight="bold"
                        color="white"
                        bg="gray.900"
                        borderRadius="xl"
                        _focus={{ outline: 'none', ring: '2px', ringOffset: '2px', ringColor: 'gray.900' }}
                        colorScheme='purple' 
                        // onClick={handleAddProduct} 
                        w='full'
                    >
                        Add New Product
                    </Button>
                </VStack>
            </Box>
        </VStack>
        </Container>
}

export default CreatePage