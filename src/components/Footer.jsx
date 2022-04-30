import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

const Footer = () => {
	return (
		<Flex align="center" justify="center" p="5" direction="column" w={{ base: "900px", md: "1200px", lg: "1400px" }}>
			<Text fontWeight="700">20202 Amaxon Computer All rights reserved</Text>
			<Flex fontSize="20pt" gap="2">
				<AiFillInstagram />
				<AiOutlineTwitter />
			</Flex>
		</Flex>
	);
};

export default Footer;
