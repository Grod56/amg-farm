import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/lib/components/footer/Footer";
import Header from "@/lib/components/header/Header";
import { newReadonlyModel } from "@mvc-react/mvc";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "AMG Farm",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body suppressHydrationWarning>
				<Header model={newReadonlyModel({ headerTitle: "AMG Farm" })} />
				{children}
				<Footer
					model={newReadonlyModel({
						copyrightText: `© 2025 Providence Universal Studios. All Rights Reserved.`,
					})}
				/>
			</body>
		</html>
	);
}
