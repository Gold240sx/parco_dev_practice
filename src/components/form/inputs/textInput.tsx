import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import InputLabel from "./inputLabel"
import { ImCheckmark } from "react-icons/im"
import { BiX } from "react-icons/bi"
import { capitalize } from "@/functions/capitalize"

// Styles
const inputRadius = "rounded-[8.8px]"
const borderColor = "border-[#D2D6DA]"
const inputStyles = `border-[1.5px] text-[18px] py-[10px] pl-[14px] radius-[8.8px] min-w-[100px] placeholder:text-[#A3A7AA] text-[#485057] border-[#D2D6DA] focus:border-[#34D1F5] focus-visible:ring-[#81E3F9] data-[validated='true']:border-[#66D531] data-[validated='true']:focus-visible:ring-0 data-[validated='true']:hover:border-[#328E08] data-[validated='true']:ring-0 data-[error='true']:focus-visible:ring-0 !data-[error='true']:focus-visible:border-red-500`

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
		type?:
			| "text"
			| "number"
			| "email"
			| "phone"
			| "password"
			| "name"
			| "fullName"
			| "firstName"
			| "lastName"
			| "username"
	}
}

const TextInput = ({ props }: TextInputProps) => {
	const {
		name,
		type = "text",
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

	const errors = false // replace with validation logic from zod.
	const value = null // replace with value from react-hook-form

	const autocomplete = (() => {
		// Returns the correct autocomplete value based on the type prop
		switch (type || name) {
			case "name":
				return "name"
			case "fullName":
				return "name"
			case "firstName":
				return "given-name"
			case "lastName":
				return "family-name"
			case "username":
				return "username"
			case "phone":
				return "tel"
			case "email":
				return "email"
			default:
				return "on"
		}
	})()

	return (
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
						className={`peer pe-9 ${inputStyles} ${
							errors ? "!border-red-300" : ""
						}`}
						autoCapitalize="on"
						autoComplete={autocomplete}
						placeholder={placeholder}
						data-validated={
							!errors && value === null ? "false" : "true"
						}
						onChange={(e) => onChange && onChange(e.target.value)}
						type={type === "phone" ? "text" : type}
						data-error={errors ? "true" : "false"}
						required={required}
					/>
					<div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
						{!errors && (
							<ImCheckmark
								size={12}
								className={`text-[#66D531]`}
								aria-hidden="true"
							/>
						)}
						{errors && (
							<BiX
								size={20}
								className={`text-red-500 stroke-2`}
								aria-hidden="true"
							/>
						)}
					</div>
				</div>
				{errors && (
					<p
						className="mt-2 text-xs text-destructive text-red-500 px-[14px]"
						role="alert"
						aria-live="polite">
						{capitalize(label)} is invalid
					</p>
				)}
			</div>
		</div>
	)
}

export default TextInput
