import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { newReadonlyModel } from "@mvc-react/mvc";
import Header from "@/lib/components/header/Header";
import Footer from "@/lib/components/footer/Footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

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
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
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
