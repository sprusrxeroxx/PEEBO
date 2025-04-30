import React from "react";
import { Flex, Spinner, Text } from "@chakra-ui/react";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
    <Flex 
      direction="column" 
      justify="center" 
      align="center" 
      height="200px" 
      width="100%"
    >
      <Spinner 
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="brand.primary"
        size="xl"
        mb={4}
      />
      <Text color="gray.500" fontFamily="heading">
        {text}
      </Text>
    </Flex>
  );
};

export default LoadingSpinner;