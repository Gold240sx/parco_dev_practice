"use client"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Modal from "@/components/layout/globalModal"
import React, { useState, useEffect } from "react"

export default function Home() {
	const searchParams = useSearchParams()
	const openModal = searchParams.get("openModal")
	const [modalOpen, setModalOpen] = useState(
		openModal?.toString() === "true" ? true : false
	)

	const setBodyToUnscrollable = () => {
		document.body.style.overflow = "hidden"
	}

	useEffect(() => {
		if (modalOpen) {
			setBodyToUnscrollable()
		}
		return () => {
			document.body.style.overflow = "auto"
		}
	}, [modalOpen])

	return (
		<div className="relative w-full h-full">
			<Modal
				isOpen={modalOpen}
				onClose={() => setModalOpen(false)}
				className="bg-white max-w-screen-lg rounded w-auto h-auto m-8 lg:mx-auto relative text-black">
				<h1 className="text-3xl pb-2">
					Speedy Service Quote Inquiry Form
				</h1>
				(!isFormSubmitted && (
				<div id="no-user-subheader" className="sr-only">
					Global form content
				</div>
				))
				{/* Add Forms Below */}
				{/* <MultiStepFormExample /> */}
			</Modal>
		</div>
	)
}
