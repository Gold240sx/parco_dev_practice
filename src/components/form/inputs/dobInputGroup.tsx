import React, { useState, useEffect } from "react"
import SelectInput from "./selectInput"
import TextInput from "./textInput"
import InputLabel from "./inputLabel"
import noOfDays from "@/functions/noOfDays" // Import your noOfDays function

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
	const [selectedMonth, setSelectedMonth] = useState("")
	const [dayOptions, setDayOptions] = useState<
		{ value: string; label: string }[]
	>([])

	useEffect(() => {
		if (selectedMonth) {
			const days = noOfDays(selectedMonth)
			const daysArray = Array.isArray(days)
				? days.map((day) => ({
						value: day.toString(),
						label: day.toString(),
				  }))
				: []
			setDayOptions(daysArray)
		} else {
			setDayOptions([]) // Clear options if no month is selected
		}
	}, [selectedMonth])

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
				<SelectInput
					props={{
						name: "month",
						label: "Month",
						required: false,
						className: "col-span-1",
						options: monthOptions, // Assuming you have a monthOptions array defined elsewhere
						placeholder: "mm",
						tooltipText: "The month you were born",
						onChange: (value: string) => setSelectedMonth(value), // Update the selected month
					}}
				/>
				<SelectInput
					props={{
						name: "day",
						label: "Day",
						required: false,
						options: dayOptions,
						placeholder: "dd",
						disabled: !selectedMonth, // Disable if month is not selected
						className: "col-span-1",
						tooltipText: "The day you were born",
					}}
				/>
				<TextInput
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
			</div>
		</>
	)
}

export default DOBInputGroup
