import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductsCard = ({ product }) => {
    const {updateProduct} = useProductStore();
    const handleUpdateProduct = async(id,updatedproduct) => {
        const {success, message} = await updateProduct(product._id, updatedProduct);
        onClose();
        if(!success) {
          tost({
              title: "Error",
              description: message,
              status: "error",
              duration: 5000,
              isClosable: true,
          })
        } else {
          tost({
              title: "Success",
              description: "Product updated successfully",
              status: "success",
              duration: 5000,
              isClosable: true,
          })
        }
    }
    const [updatedProduct , setUpdatedProduct] = useState(product);
   const tost = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProduct } = useProductStore();
  const handleDeleteProduct = async (id) => {
    const {success, message} = await deleteProduct(id);
    if(!success) {
        tost({
            title: "Error",
            description: message,
            status: "error",
            duration: 5000,
            isClosable: true,
        });
        return;
    } else {
        tost({
            title: "Success",
            description: message,
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    }
  };
  const TextColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={"48"}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={6}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontSize={"xl"} fontWeight={"bold"} mb={4} color={TextColor}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen}/>
          <IconButton
            icon={<DeleteIcon />}
            onClick={() => handleDeleteProduct(product._id)}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input placeholder="Product Name" name="name" value={updatedProduct.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value})} />

                <Input placeholder="Product Price" name="price" type="number" value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value})}/>

                <Input placeholder="Image URL" name="image" value={updatedProduct.image} onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value})}/>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={() => handleUpdateProduct(product)}>Update</Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductsCard;
