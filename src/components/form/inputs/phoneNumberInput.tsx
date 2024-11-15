import React, { useState } from "react"
import { formatPhoneNumber } from "@/functions/formatPhoneNumber"
import { AiFillCheckCircle } from "react-icons/ai"
import { useFormContext } from "react-hook-form"

type TextInputProps = {
	props: {
		name: string
		label: string
		required: boolean
		min?: number
		max?: number
		onChange?: (value: string) => void
		className?: string
		minLength?: number
		maxLength?: number
		placeholder?: string
		questionMark?: boolean
		tooltipText?: string
	}
}

const PhoneNumberInput = ({ props }: TextInputProps) => {
	const [formattedNational, setFormattedNational] = useState("")
	const [showValidInput, setShowValidInput] = useState(false)
	const {
		name,
		label,
		required,
		placeholder,
		className,
		onChange,
		min,
		max,
		minLength,
		maxLength,
		questionMark = false,
		tooltipText = false,
	} = props

	const {
		register,
		setValue,
		formState: { errors },
	} = useFormContext()

	// const { register, errors } = useFormContext()
	// Watch for phone number input and auto-format it
	const handlePhoneNumberChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		let value = e.target.value.replace(/\D/g, "") // Remove all non-digits
		if (value.length > 10) value = value.slice(0, 10) // Limit to 10 digits

		if (e.target.value.length === 14) {
			setShowValidInput(true)
		} else {
			setShowValidInput(false)
		}

		const formattedNational = formatPhoneNumber(value)
		setFormattedNational(formattedNational)
		setValue("phoneNumber", formattedNational)
	}
	return (
		<div>
			<input
				type="text"
				className={`${className} flex flex-1 z-0 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400`}
				maxLength={14}
				{...register("phoneNumber", {
					required: required ? "Required" : false,
					minLength: {
						value: minLength || 10,
						message: `Must be at least ${
							minLength || 10
						} characters`,
					},
					maxLength: {
						value: maxLength || 14,
						message: `Must be at most ${maxLength || 14} characters
						`,
					},
				})}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					console.log(e.target.value)
					handlePhoneNumberChange(e)
				}}
				value={formattedNational}
				placeholder={placeholder || "(123) 456-7890"}
				autoComplete="tel-national"
			/>
			<AiFillCheckCircle
				className={`${
					showValidInput ? "block" : "hidden"
				} absolute top-1/2 text-2xl right-2 transform -translate-y-1/2 text-lime-500`}
			/>
		</div>
	)
}

export default PhoneNumberInput
