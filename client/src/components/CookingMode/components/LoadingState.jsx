import {
  Flex,
  Text,
  Progress
} from "@chakra-ui/react";
import Loader from "./Loader.jsx";

function LoadingState() {
  return (
    <Flex direction="column" align="center" justify="center" h="80vh">
      <Text mb={4}>Loading cooking instructions...</Text>
      <Progress size="xs" isIndeterminate w="80%" colorScheme="brand" />
      {/* <Loader /> */}
    </Flex>
  );
}

export default LoadingState;