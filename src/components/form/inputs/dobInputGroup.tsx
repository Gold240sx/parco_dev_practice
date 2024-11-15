import React, { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import SelectInput from "./selectInput"
import TextInput from "./textInput"
import InputLabel from "./inputLabel"
import noOfDays from "@/functions/noOfDays"

const monthOptions = [
	{ value: "01", label: "January" },
	{ value: "02", label: "February" },
	{ value: "03", label: "March" },
	{ value: "04", label: "April" },
	{ value: "05", label: "May" },
	{ value: "06", label: "June" },
	{ value: "07", label: "July" },
	{ value: "08", label: "August" },
	{ value: "09", label: "September" },
	{ value: "10", label: "October" },
	{ value: "11", label: "November" },
	{ value: "12", label: "December" },
]

const DOBInputGroup = () => {
	const {
		control,
		setValue,
		getValues,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			month: "",
			day: "",
			year: "",
		},
	})

	const selectedMonth = watch("month")
	const selectedYear = watch("year")
	const [dayOptions, setDayOptions] = useState<
		{ value: string; label: string }[]
	>([])

	useEffect(() => {
		if (selectedMonth) {
			const days = noOfDays(
				selectedMonth,
				selectedYear ? parseInt(selectedYear) : null
			)
			const daysArray = days.map((day) => ({
				value: day.toString(),
				label: day.toString(),
			}))
			setDayOptions(daysArray)
		} else {
			setDayOptions([]) // Clear day options if month is not selected
		}
	}, [selectedMonth, selectedYear])

	// Custom validation for non-leap year with February 29
	const validateDate = () => {
		const month = getValues("month")
		const day = getValues("day")
		const year = parseInt(getValues("year") || "0")

		if (month === "02" && day === "29" && year) {
			// Check if the year is not a leap year
			if (!(year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))) {
				return "February only has 28 days in this year."
			}
		}
		return true
	}

	return (
		<>
			<InputLabel
				props={{
					label: "Date of Birth",
					name: "dob",
					required: true,
					requiredLabel: {
						labelClassName: " font-normal flex text-[18px]",
					},
					requiredPosition: "inline",
					hasQuestionTooltip: true,
					tooltipText: "Explanation here",
				}}
			/>

			<div className="grid grid-cols-1 mt-2 sm:grid-cols-3 gap-1.5 text-[#262627]">
				<Controller
					name="month"
					control={control}
					render={({ field }) => (
						<SelectInput
							{...field}
							props={{
								name: "month",
								label: "Month",
								required: false,
								className: "col-span-1",
								options: monthOptions,
								placeholder: "mm",
								tooltipText: "The month you were born",
								onChange: (value: string) =>
									field.onChange(value),
							}}
						/>
					)}
				/>
				<Controller
					name="day"
					control={control}
					render={({ field }) => (
						<SelectInput
							{...field}
							props={{
								name: "day",
								label: "Day",
								required: false,
								options: dayOptions,
								placeholder: "dd",
								disabled: !selectedMonth,
								className: "col-span-1",
								tooltipText: "The day you were born",
								onChange: (value: string) =>
									field.onChange(value),
							}}
						/>
					)}
				/>
				<Controller
					name="year"
					control={control}
					rules={{
						validate: validateDate,
					}}
					render={({ field }) => (
						<TextInput
							{...field}
							props={{
								name: "year",
								label: "Year",
								type: "number",
								min: 1900,
								max: new Date().getFullYear(),
								required: false,
								placeholder: "yyyy",
								className: "col-span-1",
								tooltipText: "The year you were born",
							}}
						/>
					)}
				/>
			</div>

			{/* Display error message if validation fails */}
			{errors.year && (
				<p className="text-red-500">{errors.year.message}</p>
			)}
		</>
	)
}

export default DOBInputGroup
