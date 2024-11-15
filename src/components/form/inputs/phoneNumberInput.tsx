import React, { useState } from "react"
import { formatPhoneNumber } from "@/functions/formatPhoneNumber"
import { AiFillCheckCircle } from "react-icons/ai"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import InputLabel from "./inputLabel"
import { ImCheckmark } from "react-icons/im"
import { BiX } from "react-icons/bi"

const inputStyles = `border-[1.5px] !text-[18px] py-[20px] pl-[14px] radius-[8.8px] min-w-[100px] placeholder:text-[#A3A7AA] text-[#485057] border-[#D2D6DA] focus:border-[#34D1F5] focus-visible:ring-[#81E3F9] data-[validated='true']:border-[#66D531] data-[validated='true']:focus-visible:ring-0 data-[validated='true']:hover:border-[#328E08] data-[validated='true']:ring-0 data-[error='true']:focus-visible:ring-0 !data-[error='true']:focus-visible:border-red-500`

type PhoneInputProps = {
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

const PhoneNumberInput = ({ props }: PhoneInputProps) => {
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
		watch,
		formState: { errors },
	} = useFormContext()

	const value = watch("phoneNumber") // replace with value from react-hook-form

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
		<>
			<div>
				<div className="space-y-2">
					<InputLabel
						props={{
							label,
							name,
							required,
							requiredLabel: {
								labelClassName: "",
							},
							requiredPosition: "inline",
							hasQuestionTooltip: questionMark,
							tooltipText: tooltipText || "",
						}}
					/>
					<div className="relative">
						<Input
							id="input-10"
							type="tel"
							className={`peer pe-9 ${inputStyles} ${
								errors[name] ? "!border-red-300" : ""
							}`}
							maxLength={14}
							autoCapitalize="on"
							autoComplete="tel-national"
							placeholder="(123) 456-7890"
							data-validated={
								!errors[name] && value && value !== ""
									? "true"
									: "false"
							}
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
									message: `Must be at most ${
										maxLength || 14
									} characters
									`,
								},
							})}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => {
								handlePhoneNumberChange(e)
							}}
							data-error={errors[name] ? "true" : "false"}
							required={required}
						/>
						<div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
							{/* Checkmark must only display if there are no errors with the name and there is a value */}
							{!errors[name] && value !== "" && (
								<ImCheckmark
									size={12}
									className={`text-[#66D531]`}
									aria-hidden="true"
								/>
							)}
							{errors[name] && value !== "" && (
								<BiX
									size={20}
									className={`text-red-500 stroke-2`}
									aria-hidden="true"
								/>
							)}
						</div>
					</div>
					{errors?.phoneNumber && (
						<p
							className="mt-2 text-xs text-destructive text-red-500 px-[14px]"
							role="alert"
							aria-live="polite">
							{typeof errors?.phoneNumber?.message === "string" &&
								errors?.phoneNumber?.message}
						</p>
					)}
				</div>
			</div>
		</>
	)
}

export default PhoneNumberInput
