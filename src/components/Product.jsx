import { Box, Flex, Image, Text, Spinner } from "@chakra-ui/react";
import React from "react";
import { urlFor } from "../lib/client";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

const Product = ({ product: { image, name, slug, price } }) => {
	const router = useRouter();

	return (
		<Flex direction="column">
			<Flex
				align="center"
				justify="center"
				w="250px"
				mb="2"
				border="1px solid"
				borderColor="gray.300"
				cursor="pointer"
				onClick={() => router.push(`/product/${slug.current}`)}
				as={motion.div}
				whileHover={{ scale: 1.1 }}
				transition="0.5s linear"
			>
				<Image src={urlFor(image && image[0])} alt="productimage" w="200px" h="200px" objectFit="contain" />
			</Flex>
			<Text>{name}</Text>
			<Text fontWeight="700" fontSize="10pt">
				${price}
			</Text>
		</Flex>
	);
};

export default Product;
