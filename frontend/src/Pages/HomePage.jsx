import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductsCard from "../components/ProductsCard";

const HomePage = () => {
  const { products ,fetchProducts } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-l, cyan.400, blue.500, purple.600)"}
          bgClip={"text"}
        >
          Current Products 🚀
        </Text>

            <SimpleGrid columns={{
              base: 1,
              md: 2,
              lg: 3,
            }} spacing={10} w={"full"} >
              {products.map((product) => (
                <ProductsCard key={product._id} product={product} />
              ))}
            </SimpleGrid>

            {products.length === 0 && (<Text
          fontSize={"xl"}
          textAlign={"center"}
          fontWeight={"bold"}
          color={"gray.500"}
        >
          No products available 😢{" "}
          <Link to={"/create"}>
            <Text
              as={"span"}
              color={"blue.500"}
              _hover={{ textDecoration: "underline" }}
            >
              Create a new product
            </Text>

            </Link>
            </Text>)}
      </VStack>
    </Container>
  );
};

export default HomePage;
