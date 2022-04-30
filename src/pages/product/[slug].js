import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
	Flex,
	Image,
	Text,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Box,
	Button,
	keyframes,
	usePrefersReducedMotion,
	Spinner,
} from "@chakra-ui/react";

import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { motion } from "framer-motion";

import { Product } from "../../components";
import { client, urlFor } from "../../lib/client";
import {
	QtyState,
	TotalPriceState,
	TotalQuantitiesState,
	CartItemsState,
	showCartState,
} from "../../context/StateContex";
import getStripe from "../../lib/getStripe";

const spin = keyframes`
from { transform: translateX(0); }
to { transform: translateX(-120%); }
`;

const ProductDetail = ({ product, products }) => {
	const { name, image, detail, price } = product;
	// console.log({ products });

	const prefersReducedMotion = usePrefersReducedMotion();
	const animation = prefersReducedMotion ? undefined : `${spin} infinite 8s ease-in-out`;

	const [index, setIndex] = useState(0);

	//From recoil state
	const [qty, setQTY] = useRecoilState(QtyState);
	const [totalPrice, setTotalPrice] = useRecoilState(TotalPriceState);
	const [totalQuantities, setTotalQuantities] = useRecoilState(TotalQuantitiesState);
	const [cartItems, setCartItem] = useRecoilState(CartItemsState);
	const setShowCart = useSetRecoilState(showCartState);

	// console.log({ cartItems });

	// Add Cart Function
	const onAdd = (product, quantity) => {
		setTotalPrice((prev) => prev + product.price * quantity);
		setTotalQuantities((prev) => prev + quantity);
		//Kiem tra xem san pham nay da co trong cart chua
		const checkProduct = cartItems?.find((item) => item?._id === product._id);
		//Neu co roi
		if (checkProduct) {
			//sau do update item trong cart
			const updateCartItems = cartItems.map((itemCart) => {
				if (itemCart?._id === product._id)
					return {
						...itemCart,
						quantity: itemCart?.quantity + quantity,
					};
			});
			setCartItem(updateCartItems);
			//Neu san pham chua co
		} else {
			product.quantity = quantity;
			setCartItem([...cartItems, { ...product }]);
		}
		toast.success(`${qty} ${product.name} added to the cart.`);
	};

	//Function for Buy Now with Stripe
	const handleBuyNow = async () => {
		onAdd(product, qty);
		setShowCart(true);
	};

	return (
		<Flex direction="column">
			<Flex gap="10" my="50px" mx="auto" w={{ base: "900px", md: "1200px", lg: "1400px" }}>
				<Flex direction="column" w="50%">
					<Box mx="auto" as={motion.div} whileHover={{ scale: 1.1 }} transition="0.2s ease-in-out">
						<Image src={urlFor(image && image[index])} alt="productdetail" />
					</Box>
					<Flex gap="5" mt="30px">
						{image &&
							image?.map((item, _i) => (
								<Box
									key={_i}
									border="1px solid"
									borderColor="gray.200"
									as={motion.div}
									whileHover={{ scale: 1.3 }}
									transition="0.2s ease-in-out"
								>
									<Image
										src={urlFor(item)}
										alt="image product"
										w="70px"
										h="70px"
										cursor="pointer"
										onMouseEnter={() => setIndex(_i)}
									/>
								</Box>
							))}
					</Flex>
				</Flex>
				<Flex direction="column" w="20%" gap="4" ml="20">
					<Text fontSize="30px" fontWeight="700">
						{name}
					</Text>
					<Flex color="red.500" align="center">
						<AiFillStar />
						<AiFillStar />
						<AiFillStar />
						<AiFillStar />
						<AiFillStar />
						<AiOutlineStar />
						<Text color="gray">(20)</Text>
					</Flex>
					<Flex direction="column">
						<Text fontWeight="600">Details:</Text>
						<Text>{detail}</Text>
					</Flex>
					<Text color="red" fontWeight="700" fontSize="22px">
						${price}
					</Text>
					<Flex direction="column">
						<Text fontWeight="600">Quantity:</Text>
						<NumberInput size="xs" maxW={16} defaultValue={1} min={1}>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper onClick={() => setQTY((prev) => prev + 1)} />
								<NumberDecrementStepper
									onClick={() =>
										setQTY((prev) => {
											if (prev - 1 < 1) {
												return 1;
											}
											return prev - 1;
										})
									}
								/>
							</NumberInputStepper>
						</NumberInput>
					</Flex>
					<Flex gap="2" direction={{ base: "column", md: "row" }}>
						<Button
							w="150px"
							variant="outline"
							color="red"
							_hover={{ bg: "green", color: "white" }}
							onClick={() => onAdd(product, qty)}
						>
							Add to Cart
						</Button>
						<Button w="150px" variant="solid" bg="red" color="white" _hover={{ bg: "blue" }} onClick={handleBuyNow}>
							Buy Now
						</Button>
					</Flex>
				</Flex>
			</Flex>
			<Flex direction="column" mt="100px" mx="auto" w={{ base: "900px", md: "1200px", lg: "1400px" }}>
				<Text textAlign="center" fontSize="30px" fontWeight="700">
					You may also like
				</Text>
				<Flex overflowX="hidden" height="400px" gap="5" mt="50px">
					{products?.map((item) => (
						<Flex key={item._id} animation={animation} w="150%" justifyContent="center">
							<Product product={item} />
						</Flex>
					))}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default ProductDetail;

//==========================Get Static Props=====================================/
export const getStaticPaths = async () => {
	const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;
	// console.log({ query });
	const productsSlug = await client.fetch(query);
	const paths = productsSlug.map((product) => ({
		params: {
			slug: product.slug.current,
		},
	}));

	return {
		paths,
		fallback: "blocking",
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
	const queryProducts = '*[_type == "product"]';

	const product = await client.fetch(query);
	const products = await client.fetch(queryProducts);

	return {
		props: {
			product,
			products,
		},
	};
};
