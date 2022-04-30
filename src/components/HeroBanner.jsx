import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useRouter } from "next/router";

import { urlFor } from "../lib/client";

const HeroBanner = ({ bannerData }) => {
	const router = useRouter();

	return (
		<Flex bg="#dcdcdc" h="650px" w={{ base: "900px", md: "1200px", lg: "1400px" }} mx="auto" rounded="xl">
			<Flex direction="column" ml="25px" mt="150px" gap="3">
				<Text>{bannerData.smallText}</Text>

				<Heading as="h2" size="3xl" fontWeight="700">
					{bannerData.midText}
				</Heading>

				<Heading as="h1" size="4xl" fontSize="150" color="white" fontWeight="800">
					{bannerData.largeText1}
				</Heading>

				<Image src={urlFor(bannerData.image)} alt="banner" pos="absolute" top="10" left="30%" />
				<Button
					w="120px"
					bg="red"
					colorScheme="white"
					rounded="xl"
					onClick={() => router.push(`/product/${bannerData.product}`)}
				>
					{bannerData.buttonText}
				</Button>
				<Flex
					align="center"
					direction="column"
					pos="relative"
					left={{ md: "800", lg: "1000px" }}
					bottom="-120px"
					display={{ base: "none", md: "flex" }}
				>
					<Text fontWeight="700">Description</Text>
					<Text color="gray.500">{bannerData.desc}</Text>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default HeroBanner;
