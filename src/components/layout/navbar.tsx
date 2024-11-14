import React from "react"
import Image from "next/image"
import Link from "next/link"
import ParkoLogo from "@/assets/branding/parco_large.png"
import { FaPhoneAlt } from "react-icons/fa"
import SubNavbarSaveNotification from "./subNavbarSaveNotification"
import PageLoadingIndicator from "./pageLoadingIndicator"

const Navbar = () => {
	return (
		<>
			<div className="bg-white flex justify-between h-[61px] px-6 items-center">
				<Link href="/" className="flex-1">
					<Image
						src={ParkoLogo}
						alt="Parko Logo"
						className="h-auto w-[108px]"
					/>
				</Link>
				<h4 className="text-black body1">Create Your PARCO Profile</h4>
				<div className="flex-1 flex justify-end">
					<button className=" bg-[#FFCA59] rounded-lg py-[6px] px-[10px] text-black ">
						<Link
							href="tel:+1234567890"
							className="flex gap-1.5 items-center">
							<FaPhoneAlt className="h-[16px] w-[16px] " />
							<h4 className="text-black body1 text-[18px]">
								Just Call Us
							</h4>
						</Link>
					</button>
				</div>
			</div>
			<PageLoadingIndicator />
		</>
	)
}

export default Navbar
