"use client"
import React from "react"
import { Input } from "@/components/ui/input"
import InputLabel from "./inputLabel"
import { ImCheckmark } from "react-icons/im"
import { BiX } from "react-icons/bi"
import { Controller, useFormContext } from "react-hook-form"

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
		hideError?: boolean
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
		hideError = false,
		className,
		onChange,
		min,
		max,
		minLength,
		maxLength,
		questionMark = false,
		tooltipText = false,
	} = props

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

	const {
		control,
		getValues,
		setValue,
		watch,
		formState: { errors },
	} = useFormContext()

	const displayErrors = () => {
		/*  
			Why not just display errors.name? This function allows nested object paths to be passed as the 
			name prop, providing a more flexible way to access errors in nested objects.
		*/

		const errorPath = name
			.split(".")
			.reduce((acc, part) => acc?.[part], (errors as any) || {}) as {
			message?: string
		}
		// console.log(errorPath !== undefined ? errorPath : name)
		return typeof errorPath === "object" && "message" in errorPath
			? String(errorPath.message)
			: null
	}

	const value = watch(name)

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
					<Controller
						name={name}
						control={control}
						render={({ field }) => (
							<>
								<Input
									{...field}
									onChange={(value) => {
										// console.log(value.target.value)
										if (type === "number") {
											field.onChange(
												value.target.valueAsNumber
											)
										} else {
											field.onChange(value.target.value)
										}
									}}
									id={`${name}-input`}
									className={`peer pe-9 ${inputStyles} ${
										errors[name] ? "!border-red-300" : ""
									}`}
									autoCapitalize="on"
									autoComplete={autocomplete}
									placeholder={placeholder}
									data-validated={
										!errors[name] && value && value !== ""
											? "true"
											: "false"
									}
									type={type ? type : "text"}
									data-error={errors[name] ? "true" : "false"}
									required={required}
								/>
								<div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
									{!errors[name] && value && value !== "" && (
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
							</>
						)}
					/>
				</div>

				{!hideError && displayErrors() && (
					<p className="text-red-500 text-sm">{displayErrors()}</p>
				)}
			</div>
		</div>
	)
}

export default TextInput
