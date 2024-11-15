import React from "react"
import Image from "next/image"
import Link from "next/link"
import ParcoLogo from "@/assets/branding/parco_large.png"
import { FaPhoneAlt } from "react-icons/fa"
import SubNavbarSaveNotification from "./subNavbarSaveNotification"
import PageLoadingIndicator from "./pageLoadingIndicator"
import { GiHamburgerMenu } from "react-icons/gi"

const Navbar = () => {
	return (
		<>
			<div className="bg-white flex justify-between py-2 xs:h-[61px] px-6 items-center">
				<Link href="/" className="flex-1">
					<Image
						src={ParcoLogo}
						alt="Parco Logo"
						className="h-auto w-[108px]"
					/>
				</Link>

				<h4 className="text-black body1 hidden sm:block sm:text-center text-balance">
					Create Your PARCO Profile
				</h4>
				<div className="flex-1 justify-end hidden sm:flex">
					<button className=" bg-[#FFCA59] hover:bg-[#FFD26B] rounded-lg py-[6px] px-[10px] text-black ">
						<Link
							href="tel:+1234567890"
							className="flex gap-1.5 items-center">
							<FaPhoneAlt className="h-[16px] w-[16px] " />
							<h4 className="text-black body1 text-[18px] uppercase hidden md:flex">
								Just Call Me
							</h4>
						</Link>
					</button>
				</div>
				{/* Hamburger menu */}
				<div className="sm:hidden items-center flex mt-1">
					<button className="">
						<GiHamburgerMenu className="text-3xl text-zinc-400" />
					</button>
				</div>
			</div>
			<PageLoadingIndicator />
		</>
	)
}

export default Navbar
