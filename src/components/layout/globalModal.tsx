import React from "react"
import { AiOutlineCloseCircle } from "react-icons/ai"

type ModalProps = {
	isOpen: boolean
	onClose: () => void
	children: React.ReactNode
	className?: string
}

const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
	// close popup is for removing the cookies alert scroll on close when needed
	if (!isOpen) return null

	return (
		<div
			onClick={onClose}
			className={`fixed top-0 left-0 right-0 bottom-0 inset-0 z-40 w-screen h-screen bg-black/80 backdrop-blur-sm `}>
			<button
				className="fixed z-50 right-2 top-2 text-gray-500 hover:text-gray-700 md:hover:text-gray-100 bg-white sm:bg-white/10 hover:bg-white rounded-full p-[1px] md:bg-transparent md:hover:bg-transparent transition-all ease-in-out duration-300"
				onClick={onClose}>
				<AiOutlineCloseCircle className="text-4xl m-px" />
			</button>
			<div
				className={`relative w-screen h-screen flex flex-col place-content-center blur-none`}>
				<div
					onClick={(e) => e.stopPropagation()}
					className={` p-6 rounded-lg shadow-lg z-50 relative ${className} overflow-y-scroll`}>
					{children}
				</div>
			</div>
		</div>
	)
}

export default Modal
