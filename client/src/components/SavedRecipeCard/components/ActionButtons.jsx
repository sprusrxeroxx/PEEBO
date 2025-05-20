import { HStack, Button, Icon } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { MdRestaurantMenu } from "react-icons/md";

export default function ActionButtons({ onViewDetails, onCook }) {
  return (
    <HStack mt={3} spacing={2}>
      <Button
        variant="outline"
        colorScheme="brand"
        size="sm"
        width="50%"
        onClick={onViewDetails}
        leftIcon={<ExternalLinkIcon />}
        fontFamily="heading"
      >
        View Recipe
      </Button>
      <Button
        variant="primary"
        colorScheme="green"
        size="sm"
        width="50%"
        onClick={onCook}
        leftIcon={<Icon as={MdRestaurantMenu} />}
        fontFamily="heading"
      >
        Cook
      </Button>
    </HStack>
  );
}