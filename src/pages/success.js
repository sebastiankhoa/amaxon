import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";

import { TotalPriceState, TotalQuantitiesState, CartItemsState } from "../context/StateContex";
import { runFireworks } from "../lib/utils";
import { Button, Center, Flex, Heading, Text, Box } from "@chakra-ui/react";

const Success = () => {
	const setTotalPrice = useSetRecoilState(TotalPriceState);
	const setTotalQuantities = useSetRecoilState(TotalQuantitiesState);
	const setCartItem = useSetRecoilState(CartItemsState);

	useEffect(() => {
		localStorage.clear();
		setTotalPrice(0);
		setTotalQuantities(0);
		setCartItem([]);
		runFireworks();
	}, []);

	const router = useRouter();

	return (
		<Flex direction="column" h="85vh" align="center" justify="center" w={{ base: "900px", md: "1200px", lg: "1400px" }}>
			<Flex
				direction="column"
				bg="gray.200"
				opacity="90%"
				py="100px"
				px={{ base: "150px", md: "250px" }}
				align="center"
				gap="2"
				rounded="2xl"
			>
				<BsBagCheckFill color="green" fontSize="30pt" />
				<Heading fontWeight="900">Thank You For Your Purchase</Heading>
				<Text>Check your email inbox for the receipt</Text>
				<Flex gap="2">
					If you have any questions,please email <Text color="red"> orders@gmail.com</Text>
				</Flex>
				<Button mt="10" bg="red" color="white" onClick={() => router.push("/")}>
					CONTINUE SHOPPING
				</Button>
			</Flex>
		</Flex>
	);
};

export default Success;
