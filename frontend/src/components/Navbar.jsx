import { Button, Container, Flex, HStack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container maxW={"1140px"} px={4}bg={useColorModeValue("white", "gray.900")}
    borderBottom="1px solid"
    borderColor={useColorModeValue("gray.200", "gray.700")}
    shadow="sm">
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          md: "row",
        }}
      >
        <Text
          fontSize={{ base: "22px", sm: "28px" }} // Ensure font size values have "px"
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500)" // Remove extra parentheses
          bgClip="text"
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to="/create">
            <Button>
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
            <Button onClick={toggleColorMode}>
                {colorMode === "light" ? "🌙" : "🌞"}
            </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
