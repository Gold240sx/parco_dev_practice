import React, {
	useState,
	Dispatch,
	SetStateAction,
	useLayoutEffect,
} from "react"
import { useFormContext, Controller } from "react-hook-form"
import Select from "react-select"
import {
	Select as ShadSelect,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select"
import InputLabel from "./inputLabel"
import { ImCheckmark } from "react-icons/im"
import { BiX } from "react-icons/bi"

type ReactSelectType = {
	value: string
	label: string
}

const inputStyles = `border-[1.5px] text-[18px] py-[10px] pl-[14px] radius-[8.8px] min-w-[100px] placeholder:text-[#A3A7AA] text-[#485057] border-[#D2D6DA] focus:border-[#34D1F5] focus-visible:ring-[#81E3F9] data-[validated='true']:border-[#66D531] data-[validated='true']:focus-visible:ring-0 data-[validated='true']:hover:border-[#328E08] data-[validated='true']:ring-0 data-[error='true']:focus-visible:ring-0 !data-[error='true']:focus-visible:border-red-500`

type SelectInputProps = {
	props: {
		name: string
		type?:
			| "text"
			| "number"
			| "email"
			| "password"
			| "name"
			| "fullName"
			| "firstName"
			| "lastName"
			| "username"
		label: string
		isMulti: boolean
		className?: string
		placeholder?: string
		required: boolean
		disabled?: boolean
		initialValue?: string
		selectClassName?: string
		onChange?: (value: string) => void
		options: ReactSelectType[]
		questionMark?: boolean
		hideError?: boolean
		tooltipText?: string
		state?: {
			// In case I want to include external state for whatever reason
			value:
				| string
				| { value: string; label: string; [key: string]: any }
				| { value: string; label: string; [key: string]: any }[]
			setValue: Dispatch<SetStateAction<any>>
		}
	}
}

const tempOptions = [
	{ value: "usa", label: "United States" },
	{ value: "canada", label: "Canada" },
]

const SelectInput = ({ props }: SelectInputProps) => {
	const [valueState, setValueState] = useState<any>(null)
	const {
		name,
		type = "text",
		label,
		required,
		isMulti = false,
		initialValue,
		state,
		selectClassName,
		hideError = false,
		className,
		placeholder,
		disabled = false,
		questionMark = false,
		onChange,
		options = tempOptions,
		tooltipText = false,
	} = props

	const {
		control,
		setValue,
		getValues,
		register,
		trigger,
		watch,
		formState: { errors },
		// pulling in all the options here prevents having to pass them in as props
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

	useLayoutEffect(() => {
		if (state && getValues(name) !== value) {
			setValueState(getValues(name))
		}
	}, [getValues, name, setValueState, state, value])

	return (
		<div className={`${className}`}>
			<div className="space-y-2 relative">
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
				{/* Shadcn */}
				<Controller
					name={name}
					control={control}
					render={({ field }) => {
						const isValid =
							!errors[name] && field.value && field.value !== ""
						const hasError = !!errors[name]

						return (
							<div className="relative group">
								<ShadSelect onValueChange={field.onChange}>
									<SelectTrigger
										id={name}
										data-validated={
											isValid ? "true" : "false"
										}
										data-error={hasError ? "true" : "false"}
										className={`peer border-[1.5px] text-[18px] py-[10px] pl-[14px] rounded-[8.8px] min-w-[100px] !placeholder:text-[#A3A7AA] text-[#485057] 
											border-[#D2D6DA] focus:border-[#34D1F5] focus-visible:ring-[#81E3F9] hover:border-[#34D1F5] hover:ring-[#81E3F9] group-hover:ring-[#81E3F9]
											${isValid ? "data-[validated=true]:border-[#66D531]" : ""}
											${isValid ? "data-[validated=true]:ring-0" : ""}
											${hasError ? "!data-[error=true]:focus-visible:border-red-500" : ""}
										`}>
										<SelectValue
											placeholder={placeholder}
											className="!placeholder:text-[#A3A7AA] !text-[#485057]"
										/>
									</SelectTrigger>
									<SelectContent>
										{options.map((option) => (
											<SelectItem
												key={option.value}
												value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</ShadSelect>
								<div className="absolute inset-y-0 right-3 flex items-center">
									{!errors[name] && field.value && (
										<ImCheckmark
											size={16}
											className="text-[#66D531]"
											aria-hidden="true"
										/>
									)}
									{errors[name] && (
										<BiX
											size={20}
											className="text-red-500"
											aria-hidden="true"
										/>
									)}
								</div>
							</div>
						)
					}}
				/>
				{!hideError && displayErrors() && (
					<p className="text-red-500 text-sm">{displayErrors()}</p>
				)}
			</div>
		</div>
	)
}

export default SelectInput

{
	/* OLD  SELECT */
}
{
	/* <Select onValueChange={(value) => onChange && onChange(value)}>
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
				</Select> */
}
