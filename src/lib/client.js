import SanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = SanityClient({
	projectId: "78f505nv",
	dataset: "production",
	apiVersion: "2022-04-27",
	useCdn: false,
	token: process.env.SANITY_TOKEN,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
