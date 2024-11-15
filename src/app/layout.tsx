import React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { LocalStorageProvider } from "@/context/localStorageContext"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

const inter = localFont({
	src: [
		{ path: "./fonts/Inter/Inter_28pt-Regular.ttf", weight: "400" },
		{ path: "./fonts/Inter/Inter_28pt-Bold.ttf", weight: "700" },
	],
	variable: "--font-inter",
	weight: "100 300 400 500 600 700 900",
})

const poppins = localFont({
	src: "./fonts/Poppins/Poppins-SemiBold.ttf",
	variable: "--font-poppins",
	weight: "600",
})

export const metadata: Metadata = {
	title: "Parco Dev Test",
	description: "Parco Dev Test",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<LocalStorageProvider>
			<html lang="en" suppressHydrationWarning>
				<body
					className={`${inter.variable} ${poppins.variable} antialiased relative`}>
					{children}
					<Toaster />
				</body>
			</html>
		</LocalStorageProvider>
	)
}
