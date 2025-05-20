import { Flex, Heading, Text, Icon, Divider } from "@chakra-ui/react";
import { FaBookmark } from "react-icons/fa";

const Header = () => {
  return (
    <Flex align="center" direction="column" mb={4}>
      <Heading 
        as="h1" 
        size="xl" 
        textAlign="center"
        color="brand.dark"
        mb={3}
      >
        <Icon as={FaBookmark} color="brand.secondary" mr={3} display="inline" />
        Your Recipe Collection
      </Heading>
      <Divider width="100px" borderColor="brand.primary" borderWidth="2px" />
      <Text mt={4} textAlign="center" maxW="600px" color="gray.600">
        All your favorite recipes saved in one place for easy access
      </Text>
    </Flex>
  );
};

export default Header;