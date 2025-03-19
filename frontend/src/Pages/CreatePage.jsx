import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useProductStore } from "../store/product"

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    })

    const tost = useToast()

    const {createProduct} = useProductStore()
    const handleAddProduct = async () => {
        const {success, message} = await createProduct(newProduct)
        if(!success) {
            tost({
                title: "Error",
                description: message,
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            return
        } else {
            tost({
                title: "Success",
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        }
        setNewProduct({
            name: "",
            price: "",
            image: "",
        })
    }
  return (
    <Container maxW={"container.sm"}>
        <VStack spacing={8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create a New Product
            </Heading>
                <Box w={"full"} bg={useColorModeValue("white", 'cyan.900')} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input placeholder="Product name" name="name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}/>
                        <Input placeholder="Price" name="price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}/>
                        <Input placeholder="Image URL" name="image" value={newProduct.image} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}/>

                        <Button colorScheme={"blue"} onClick={handleAddProduct} w={"full"}>Add Product</Button>
                    </VStack>
                </Box>
        </VStack>
    </Container>
  )
}

export default CreatePage