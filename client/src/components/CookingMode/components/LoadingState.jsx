import {
  Flex,
  Text,
  Progress
} from "@chakra-ui/react";

function LoadingState() {
  return (
    <Flex direction="column" align="center" justify="center" h="80vh">
      <Text mb={4}>Loading cooking instructions...</Text>
      <Progress size="xs" isIndeterminate w="80%" colorScheme="brand" />
    </Flex>
  );
}

export default LoadingState;