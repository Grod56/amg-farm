import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		authInterrupts: true,
	},
	sassOptions: {
		implementation: "sass-embedded",
	},
	serverExternalPackages: ["pdfkit"],
};

export default nextConfig;
