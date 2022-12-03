import NodeGeocoder from "node-geocoder";

const geocoder = NodeGeocoder({
	provider: "opencage",
	apiKey: process.env.GEOCODE_API_KEY,
});

export const getGeocode = async (
	address: string,
): Promise<NodeGeocoder.Entry[]> => {
	return await geocoder.geocode({
		country: "Brazil",
		countryCode: "br",
		limit: 1,
		address,
	});
};
