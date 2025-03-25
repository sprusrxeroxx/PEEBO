import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, Select } from '@chakra-ui/react';
import { useState } from 'react';
import { useProductStore } from '../store/product';

const CreatePage = () => {
    const [ newProduct, setNewProduct ] = useState({
        name: "",
        price: "",
        imageUrl: "",
        stockQuantity: "",
        unit: "kg",
        seasonal: "true",
        origin: "Tzaneen, Limpopo"
    });
    const { createProduct } = useProductStore()

    const handleAddProduct = async() => {
        const { success, message } = await createProduct(newProduct)
        console.log("Success:", success);
        console.log("Message:", message);
    }

    return (
        <Container maxW={"container.sm"}>
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
                            isRequired
                        />
                        <Input 
                            placeholder='Image URL'
                            name='imageUrl'
                            value={newProduct.imageUrl}
                            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                        />
                        <Input 
                            placeholder='Quantity'
                            name='stockQuantity'
                            type='number'
                            value={newProduct.stockQuantity}
                            onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
                        />
                        <Select
                            placeholder="Select Category"
                            name="category"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        >
                            <option value="Fruits">Fruits</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Menu">Menu</option>
                            <option value="Other">Other</option>
                        </Select>
                        <Button
                            position="relative"
                            px={8}
                            py={4}
                            fontSize="lg"
                            fontWeight="bold"
                            color="white"
                            bg={useColorModeValue("gray.900", "gray.700")}
                            borderRadius="xl"
                            _focus={{ outline: 'none', ring: '2px', ringOffset: '2px', ringColor: 'gray.900' }}
                            onClick={handleAddProduct}
                            w='full'
                        >
                            Add New Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
            </Container>
    )
}

export default CreatePage