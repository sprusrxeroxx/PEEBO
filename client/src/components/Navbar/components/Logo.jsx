import React from "react";
import { Link } from "react-router-dom";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { FaUtensils } from "react-icons/fa";
import { useNavbar } from "../useNavbar";

function Logo() {
  const { styles } = useNavbar();
  
  return (
    <Link to="/">
      <Flex alignItems="center">
        <Icon 
          as={FaUtensils} 
          color={styles.branding.color} 
          mr={2} 
          boxSize={5} 
        />
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          fontFamily="heading"
          color={styles.branding.color}
        >
          PEEBO
        </Text>
      </Flex>
    </Link>
  );
}

export default Logo;