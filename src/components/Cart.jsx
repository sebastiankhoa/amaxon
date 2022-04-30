import {
	Button,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Image,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Spacer,
	Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { FcFullTrash } from "react-icons/fc";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";

import { CartItemsState, TotalPriceState, TotalQuantitiesState } from "../context/StateContex";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = ({ show, setShow }) => {
	const [totaQuantity, setTotaQuantity] = useRecoilState(TotalQuantitiesState);
	const [cartItem, setCartItem] = useRecoilState(CartItemsState);
	const [totalPrice, setTotalPrice] = useRecoilState(TotalPriceState);

	const router = useRouter();

	const closeHandle = () => {
		router.push("/");
		setShow(false);
	};

	// Remove product in cart
	const onRemove = (product) => {
		foundProduct = cartItem.find((item) => item._id === product._id);
		const newCart = cartItem.filter((item) => item._id !== product._id);
		setTotalPrice((prev) => prev - foundProduct.price - foundProduct.quantity);
		setTotaQuantity((prev) => prev - foundProduct.quantity);
		setCartItem(newCart);
	};

	//function to update quantity for Drawer
	let foundProduct;
	let index;
	const cartItemQuantity = (id, value) => {
		foundProduct = cartItem.find((item) => item._id === id);
		index = cartItem.findIndex((item) => item._id === id);
		const newCartItem = cartItem.filter((item) => item._id !== id);

		if (value === "inc") {
			setCartItem([...newCartItem, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
			setTotalPrice((prev) => prev + foundProduct.price);
			setTotaQuantity((prev) => prev + 1);
		} else if (value === "dec") {
			if (foundProduct.quantity > 1) {
				setCartItem([...newCartItem, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
				setTotalPrice((prev) => prev - foundProduct.price);
				setTotaQuantity((prev) => prev - 1);
			}
		}
	};

	//Function for Checkout with Stripe
	const handleCheckout = async () => {
		const stripe = await getStripe();

		const response = await fetch("/api/stripe", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(cartItem),
		});
		if (response.statusCode === 500) return;

		const data = await response.json();

		toast.loading("Redirecting.....");

		stripe.redirectToCheckout({ sessionId: data.id });
	};

	//====================================================================================
	return (
		<Drawer isOpen={show} onClose={() => setShow(false)} placement="right" size="md">
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader>
					<Flex gap={2} align="center" cursor="pointer" onClick={() => setShow(false)}>
						<AiOutlineLeft />
						<Text fontWeight="600">Your Cart</Text>
						<Text fontSize="10pt" color="red">
							({totaQuantity} items)
						</Text>
					</Flex>
				</DrawerHeader>
				<DrawerBody>
					{cartItem.length < 1 && (
						<Flex direction="column" align="center">
							<AiOutlineShopping fontSize="150px" />
							<Text>Your shopping bag is empty</Text>
							<Button mt="5" bg="red" color="white" rounded="xl" onClick={closeHandle}>
								CONTINUE SHOPPING
							</Button>
						</Flex>
					)}
					<Flex direction="column" h="95%">
						{cartItem?.map((item) => (
							<Flex key={item?._id} gap={5} borderBottom="1px solid" borderColor="gray.200">
								<Flex as={motion.div} whileHover={{ scale: 1.1 }} transition="0.3s linear">
									<Image src={urlFor(item?.image[0])} alt="cartimage" w="100px" h="100px" />
								</Flex>
								<Flex direction="column" justify="space-evenly">
									<Text fontWeight="700">{item?.name}</Text>
									<NumberInput size="xs" maxW={16} defaultValue={item?.quantity} min={1}>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper onClick={() => cartItemQuantity(item?._id, "inc")} />
											<NumberDecrementStepper onClick={() => cartItemQuantity(item?._id, "dec")} />
										</NumberInputStepper>
									</NumberInput>
								</Flex>
								<Flex flexGrow={1} direction="column" justify="space-evenly" align="end">
									<Text fontWeight="700">${item?.price * item?.quantity}</Text>
									<Button variant="unstyled" onClick={() => onRemove(item)}>
										<FcFullTrash fontSize="20px" />
									</Button>
								</Flex>
							</Flex>
						))}
						<Spacer />
						{cartItem.length >= 1 && (
							<Flex direction="column" gap={5}>
								<Flex justify="space-between">
									<Text fontWeight="700">Subtotal:</Text>
									<Text fontWeight="700">${totalPrice}</Text>
								</Flex>
								<Button color="white" bg="red" rounded="2xl" w="80%" mx="auto" onClick={handleCheckout}>
									PAY WITH STRIPE
								</Button>
							</Flex>
						)}
					</Flex>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default Cart;
