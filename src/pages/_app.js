import { Toaster } from "react-hot-toast";

import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "../components";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider>
			<RecoilRoot>
				<Layout>
					<Toaster />
					<Component {...pageProps} />
				</Layout>
			</RecoilRoot>
		</ChakraProvider>
	);
}

export default MyApp;
