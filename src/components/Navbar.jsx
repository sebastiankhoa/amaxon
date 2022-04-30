import { Badge, Box, Button, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";

import { showCartState, TotalQuantitiesState } from "../context/StateContex";
import { Cart } from "./";

const Navbar = () => {
	const router = useRouter();

	const totalQuantity = useRecoilValue(TotalQuantitiesState);
	const [showCart, setShowCart] = useRecoilState(showCartState);

	return (
		<Flex
			p="2"
			h="50px"
			justify="space-between"
			w={{ base: "900px", md: "1200px", lg: "1400px" }}
			mx="auto"
			mb="3"
			cursor="pointer"
		>
			<Box onClick={() => router.push("/")}>
				<Image src="/image/logo.jpeg" alt="logo" w="60px" h="60px" />
			</Box>
			<Button variant="unstyled" onClick={() => setShowCart((prev) => !prev)}>
				<AiOutlineShopping fontSize="30px" />
				<Badge borderRadius="50%" bg="red" color="white" pos="absolute" w="18px" h="18px" right="1" top="2">
					{totalQuantity}
				</Badge>
			</Button>
			<Cart show={showCart} setShow={setShowCart} />
		</Flex>
	);
};

export default Navbar;
