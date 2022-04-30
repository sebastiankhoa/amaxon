import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";

import { Product, HeroBanner, FooterBanner } from "../components";
import { client } from "../lib/client";

export default function Home({ products, bannerData }) {
	// console.log({ products });
	return (
		<Flex direction="column">
			<HeroBanner bannerData={bannerData[0]} />
			<Flex direction="column" my="5">
				<Heading textAlign="center" fontWeight="900" color="blue.900">
					Best Selling Products
				</Heading>
				<Text textAlign="center" color="gray.500">
					Speaker of many variantion
				</Text>
			</Flex>
			<Flex w={{ base: "800px", md: "1100px", lg: "1400px" }} ml={{ base: "50px", md: "80px" }}>
				<SimpleGrid columns={{ base: 3, md: 4, lg: 5 }} spacing={5}>
					{products?.map((p, _i) => (
						<Product key={p._id} product={p} />
					))}
				</SimpleGrid>
			</Flex>
			<FooterBanner bannerData={bannerData[0]} />
		</Flex>
	);
}

export const getServerSideProps = async (ctx) => {
	const query = '*[_type == "product"]';
	const products = await client.fetch(query);

	const bannerQuery = '*[_type == "banner"]';
	const bannerData = await client.fetch(bannerQuery);

	return {
		props: {
			products,
			bannerData,
		},
	};
};
