import { Select, Box, Heading, HStack, Image, Text, useColorModeValue, IconButton, useToast, useDisclosure, ModalCloseButton, ModalBody, ModalOverlay, ModalHeader, ModalContent, Modal, VStack, Input, ModalFooter, Button } from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import { useState } from "react";

const Card = ({ product }) => {
    const [ updatedProduct, setUpdatedProduct ] = useState(product);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDelete = async (id) => {
        const { success, message } = await deleteProduct(id);
        if(!success){
            toast({
                title: "Error",
                description: message,
                status: "error",
                isClosable: true
            })
        }   else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                isClosable: true
            })
        }
    };

    const handleUpdateProduct = async (id, updatedProduct) => {
        await updateProduct(id, updatedProduct);
        onClose();
    };
    
    return (
        <Box
            bg={bg}
            shadow="lg"
            rounded="lg"    
            overflow="hidden"
            transition="all 0.25s"
            _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
        >
            <Image src={product.imageUrl} alt={product.name} h={48} w='full' objectFit='cover' />

            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight={'bold'} fontSize='xl' color={textColor} mb={4}>
                    x {product.stockQuantity}
                </Text>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />}  colorScheme='blue' onClick={onOpen}/>
                    <IconButton icon={<DeleteIcon />} colorScheme='red' onClick={() => handleDelete(product._id)} />
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input 
                                placeholder='Product Name'
                                name='name'
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />

                            <Input 
                                placeholder='Price'
                                name='price'
                                type='number'
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input 
                                placeholder='Image URL'
                                name='imageUrl'
                                value={updatedProduct.imageUrl}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, imageUrl: e.target.value })}
                            />
                            <Input 
                                placeholder='Quantity'
                                name='stockQuantity'
                                type='number'
                                value={updatedProduct.stockQuantity}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, stockQuantity: e.target.value })}
                            />
                            <Select
                                placeholder="Select Category"
                                name="category"
                                value={updatedProduct.category}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, category: e.target.value })}
                            >
                                <option value="Fruits">Fruits</option>
                                <option value="Vegetables">Vegetables</option>
                                <option value="Menu">Menu</option>
                                <option value="Other">Other</option>
                            </Select>
                        </VStack>
                    </ModalBody>
                    <ModalFooter >
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                            Update
                        </Button>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Card;