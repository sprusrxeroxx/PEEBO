import {
  HStack, Flex, Icon, Text, Badge, Box,
  Wrap, WrapItem, Tag, TagLeftIcon, TagLabel,
  useColorModeValue
} from "@chakra-ui/react";
import { FaClock, FaUsers, FaUtensils } from "react-icons/fa";

export default function RecipeMetadata({ readyInMinutes, servings, savedDate, dishTypes }) {
  return (
    <>
      <HStack mb={3} spacing={4} color="gray.600">
        <Flex align="center">
          <Icon as={FaClock} mr={1} />
          <Text fontSize="xs">{readyInMinutes} min</Text>
        </Flex>
        <Flex align="center">
          <Icon as={FaUsers} mr={1} />
          <Text fontSize="xs">{servings} servings</Text>
        </Flex>
        <Badge colorScheme="blue" fontSize="xs" ml="auto">
          Saved: {savedDate}
        </Badge>
      </HStack>

      {dishTypes && dishTypes.length > 0 && (
        <Box mb={3}>
          <Wrap spacing={2}>
            {dishTypes.slice(0, 2).map((dish, idx) => (
              <WrapItem key={idx}>
                <Tag size="sm" colorScheme="green" variant="subtle">
                  <TagLeftIcon as={FaUtensils} boxSize="10px" />
                  <TagLabel fontSize="xs" textTransform="capitalize">{dish}</TagLabel>
                </Tag>
              </WrapItem>
            ))}
            {dishTypes.length > 2 && (
              <WrapItem>
                <Tag size="sm" variant="subtle">
                  <TagLabel fontSize="xs">+{dishTypes.length - 2} more</TagLabel>
                </Tag>
              </WrapItem>
            )}
          </Wrap>
        </Box>
      )}
    </>
  );
}