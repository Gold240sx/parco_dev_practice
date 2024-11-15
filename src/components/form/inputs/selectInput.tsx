import React from "react"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import InputLabel from "./inputLabel"

type ReactSelectType = {
	value: string
	label: string
}

type SelectInputProps = {
	props: {
		name: string
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
		label: string
		className?: string
		placeholder?: string
		required: boolean
		disabled?: boolean
		onChange?: (value: string) => void
		options: ReactSelectType[]
		questionMark?: boolean
		tooltipText?: string
	}
}

const SelectInput = ({ props }: SelectInputProps) => {
	const {
		name,
		type = "text",
		label,
		required,
		className,
		placeholder,
		disabled = false,
		questionMark = false,
		onChange,
		tooltipText = false,
	} = props

	return (
		<div className={`${className}`}>
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
				<Select onValueChange={(value) => onChange && onChange(value)}>
					<SelectTrigger id={name}>
						<SelectValue
							placeholder={placeholder}
							className="!placeholder:text-[#A3A7AA] !text-[#485057] "
						/>
					</SelectTrigger>
					<SelectContent>
						{props.options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	)
}

export default SelectInput
