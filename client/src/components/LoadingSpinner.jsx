import React from "react";
import { Flex, Spinner, Text, keyframes } from "@chakra-ui/react";

const pulseAnimation = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

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
      <Text 
        color="gray.500" 
        fontFamily="heading"
        animation={`${pulseAnimation} 1.5s infinite ease-in-out`}
      >
        {text}
      </Text>
    </Flex>
  );
};

export default LoadingSpinner;