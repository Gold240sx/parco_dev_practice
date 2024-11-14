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
		type?: "text" | "number" | "email" | "password"
		label: string
		required: boolean
	}
}

const TextInput = ({ props }: TextInputProps) => {
	const { name, type = "text", label, required } = props

	const errors = false // replace with validation logic from zod.

	return (
		<div>
			<div className="space-y-2">
				<InputLabel
					props={{
						label,
						name,
						required,
						requiredLabel: {
							labelClassName: "text-[#66D531]",
						},
						requiredPosition: "inline",
						hasQuestionTooltip: true,
						tooltipText: "This is a tooltip",
					}}
				/>
				<div className="relative">
					<Input
						id="input-10"
						className={`peer pe-9 ${inputStyles}`}
						placeholder="Email"
						data-validated={errors ? "false" : "true"}
						data-error={errors ? "true" : "false"}
						required={required}
						type={type}
					/>
					<div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
						{!errors && (
							<ImCheckmark
								size={12}
								className="text-[#66D531]"
								aria-hidden="true"
							/>
						)}
						{errors && (
							<BiX
								size={12}
								className="text-red-500"
								aria-hidden="true"
							/>
						)}
					</div>
				</div>
				{!errors && (
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
