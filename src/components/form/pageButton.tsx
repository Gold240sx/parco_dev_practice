import React from "react"

const PageButtonStyles =
	"bg-[#344767] hover:bg-[#27354D] ease-in duration-100 transition-color text-white rounded-[8.8px] font-semibold font-inter text-[18px] body1 uppercase min-w-[108.64px] h-[52.8px] text-center"

type PageButtonProps = {
	props: {
		text: string
		buttonClassName?: string
		action?: () => void
		disabled?: boolean
		type: "submit" | "button"
	}
}

const PageButton = ({ props }: PageButtonProps) => {
	const { text, action, disabled, type, buttonClassName } = props
	return (
		<button className={`${buttonClassName} ${PageButtonStyles}`}>
			{text}
		</button>
	)
}

export default PageButton
