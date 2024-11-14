import React from "react"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import SubNavbarSaveNotification from "@/components/layout/subNavbarSaveNotification"

export default function TestLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="w-screen h-fit bg-white">
				<Navbar />
				<SubNavbarSaveNotification className="!absolute top-[75px] right-8 animate-pulse" />
			</div>
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	)
}
