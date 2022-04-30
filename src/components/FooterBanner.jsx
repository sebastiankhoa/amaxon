import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { urlFor } from "../lib/client";

const FooterBanner = ({ bannerData }) => {
	// console.log({ bannerData });
	return (
		<Flex
			bg="red"
			h="400px"
			mt="100px"
			mb="50px"
			mx="auto"
			rounded="2xl"
			w={{ base: "900px", md: "1200px", lg: "1400px" }}
			justifyContent="space-between"
		>
			<Flex direction="column" mt="120px" ml="40px">
				<Text color="gray.200">{bannerData.discount}</Text>
				<Heading size="4xl" color="white" fontWeight="800">
					{bannerData.largeText1}
				</Heading>
				<Heading size="4xl" fontWeight="900" color="white">
					{bannerData.largeText2}
				</Heading>
				<Text color="gray.200">{bannerData.saleTime}</Text>
			</Flex>
			<Flex mt="100px" ml="300px" direction="column">
				<Text color="gray.200" fontWeight="600">
					{bannerData.smallText}
				</Text>
				<Heading size="3xl" color="white" fontWeight="800">
					{bannerData.midText}
				</Heading>
				<Text color="gray.200">{bannerData.desc}</Text>
				<Button mt="40px" rounded="xl" w="120px" py="2" color="red">
					Shop Now
				</Button>
				<Image src={urlFor(bannerData.image)} alt="footbanner" pos="relative" top="-380" left="-500" />
			</Flex>
		</Flex>
	);
};

export default FooterBanner;
