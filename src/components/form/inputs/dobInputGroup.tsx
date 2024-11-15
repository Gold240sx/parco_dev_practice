"use client"
import React, { useState, useEffect } from "react"
import { useForm, Controller, useFormContext } from "react-hook-form"
import SelectInput from "./selectInput"
import TextInput from "./textInput"
import InputLabel from "./inputLabel"
import noOfDays from "@/functions/noOfDays"

const monthOptions = [
	{ value: "01", label: "01" },
	{ value: "02", label: "02" },
	{ value: "03", label: "03" },
	{ value: "04", label: "04" },
	{ value: "05", label: "05" },
	{ value: "06", label: "06" },
	{ value: "07", label: "07" },
	{ value: "08", label: "08" },
	{ value: "09", label: "09" },
	{ value: "10", label: "10" },
	{ value: "11", label: "11" },
	{ value: "12", label: "12" },
]

type DOBInputGroupType = {
	props: {
		currentDate: Date
	}
}

const DOBInputGroup = ({ props }: DOBInputGroupType) => {
	const { currentDate } = props
	const {
		control,
		setValue,
		setError,
		getValues,
		watch,
		formState: { errors },
	} = useFormContext()

	const selectedMonth = watch("dob.month")
	const selectedYear = watch("dob.year")
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
		const dob = getValues("dob")
		const month = getValues("dob.month")
		const day = getValues("dob.day")
		const year = parseInt(getValues("dob.year") || "0")

		if (month === "02" && day === "29" && year) {
			// Check if the year is not a leap year
			if (!(year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0))) {
				setError("dob.month", {
					type: "manual",
					message: "February only has 28 days in this year.",
				})
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
					name: "dob.dob",
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
					name="dob.month"
					control={control}
					rules={{
						validate: validateDate,
					}}
					render={({ field }) => (
						<SelectInput
							{...field}
							props={{
								isMulti: false,
								name: "dob.month",
								label: "Month",
								type: "text",
								hideError: true,
								// max: currentDate.getFullYear(),
								required: false,
								placeholder: "mm",
								className: "col-span-1",
								options: monthOptions,
							}}
						/>
					)}
				/>
				<Controller
					name="dob.day"
					control={control}
					rules={{
						validate: validateDate,
					}}
					render={({ field }) => (
						<SelectInput
							{...field}
							props={{
								isMulti: false,
								name: "dob.day",
								label: "Day",
								type: "text",
								hideError: true,
								// max: currentDate.getFullYear(),
								required: false,
								placeholder: "dd",
								className: "col-span-1",
								options: dayOptions,
							}}
						/>
					)}
				/>
				<Controller
					name="dob.year"
					control={control}
					rules={{
						validate: validateDate,
					}}
					render={({ field }) => (
						<TextInput
							{...field}
							props={{
								name: "dob.year",
								label: "Year",
								type: "text",
								hideError: true,
								// max: currentDate.getFullYear(),
								required: false,
								placeholder: "yyyy",
								className: "col-span-1",
								tooltipText: "The year you were born",
							}}
						/>
					)}
				/>
			</div>
		</>
	)
}

export default DOBInputGroup
