import React from "react"
import PageButton from "./pageButton"
import { CgArrowLeft } from "react-icons/cg"

type MultiPageFormButtonsType = {
	buttonClassName?: string
}

const BackButtonInline = () => {
	return (
		<div className="flex items-center text-[18px] gap-2 cursor-pointer font-semibold uppercase hover:bg-gray-50 rounded-[8.8px] min-w-[108.64px] h-[52.8px] ease-in duration-100 transition-color pr-3 pl-4">
			<CgArrowLeft className="text-[#344767]" />
			<p className="text-[#344767]">Back</p>
		</div>
	)
}

const MultiPageFormButtons = ({
	props,
}: {
	props: MultiPageFormButtonsType
}) => {
	const { buttonClassName } = props
	const formFullyValidated = false // replace with form validation logic

	return (
		<div className="flex justify-between w-full">
			<BackButtonInline />
			{!formFullyValidated ? (
				<PageButton
					props={{
						buttonClassName: `py-3.5 px-[10p]`,
						text: "Next",
						type: "button",
					}}
				/>
			) : (
				<PageButton
					props={{
						buttonClassName: `py-3.5 px-[10p] !min-w-[252px]`,
						text: "Set Appointment",
						type: "submit",
					}}
				/>
			)}
		</div>
	)
}

export default MultiPageFormButtons
