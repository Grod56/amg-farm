import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	sassOptions: {
		implementation: "sass-embedded",
	},
	serverExternalPackages: ["pdfkit"],
};

export default nextConfig;
