import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import { Children } from "react/cjs/react.production.min";
import Footer from "./Footer";

import Navbar from "./Navbar";

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<title>Amaxon</title>
			</Head>
			<header>
				<Navbar />
			</header>
			<main>{children}</main>
			<footer>
				<Footer />
			</footer>
		</>
	);
};

export default Layout;
