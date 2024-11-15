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

const validateDate = (
	value: string,
	allValues: { dob: { month: string; day: string; year: string } }
) => {
	const { month, day, year } = allValues.dob
	if (!month || !day || !year) return true

	const date = new Date(`${year}-${month}-${day}`)
	const isValidDate = date.getDate() === parseInt(day, 10)

	if (month === "02") {
		const isLeapYear =
			parseInt(year, 10) % 4 === 0 &&
			(parseInt(year, 10) % 100 !== 0 || parseInt(year, 10) % 400 === 0)
		if (isLeapYear && parseInt(day, 10) > 29)
			return "Invalid date for February in a leap year"
		if (!isLeapYear && parseInt(day, 10) > 28)
			return "Invalid date for February in a non-leap year"
	}

	return isValidDate || "Invalid date"
}

const DOBInputGroup = ({ props }: DOBInputGroupType) => {
	const { control, setValue, getValues, watch } = useFormContext()

	const month = watch("dobDetails.month")
	const day = watch("dobDetails.day")
	const year = watch("dobDetails.year")

	useEffect(() => {
		if (month && day && year) {
			const formattedDOB = `${month}/${day}/${year}`
			setValue("dob", formattedDOB)
		}
	}, [month, day, year, setValue])

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
			<div className="grid mt-2 xs:grid-cols-3 gap-1.5 text-[#262627]">
				<Controller
					name="dobDetails.month"
					control={control}
					rules={{
						required: "Month is required",
						validate: (value) =>
							validateDate(
								value,
								getValues() as {
									dob: {
										month: string
										day: string
										year: string
									}
								}
							),
					}}
					render={({ field }) => (
						<SelectInput
							{...field}
							props={{
								isMulti: false,
								name: "dobDetails.month",
								label: "Month",
								type: "text",
								labelClassName: "text-[16px]",
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
					name="dobDetails.day"
					control={control}
					rules={{
						required: "Month is required",
						validate: (value) =>
							validateDate(
								value,
								getValues() as {
									dob: {
										month: string
										day: string
										year: string
									}
								}
							),
					}}
					render={({ field }) => (
						<SelectInput
							{...field}
							props={{
								isMulti: false,
								name: "dobDetails.day",
								label: "Day",
								type: "text",
								options: Array.from({ length: 31 }, (_, i) => ({
									value: String(i + 1).padStart(2, "0"),
									label: String(i + 1).padStart(2, "0"),
								})),
								labelClassName: "text-[16px]",
								hideError: true,
								// max: currentDate.getFullYear(),
								required: false,
								placeholder: "dd",
								className: "col-span-1",
							}}
						/>
					)}
				/>
				<Controller
					name="dobDetails.year"
					control={control}
					rules={{
						required: "Month is required",
						validate: (value) =>
							validateDate(
								value,
								getValues() as {
									dob: {
										month: string
										day: string
										year: string
									}
								}
							),
					}}
					render={({ field }) => (
						<TextInput
							{...field}
							props={{
								name: "dobDetails.year",
								label: "Year",
								type: "text",
								hideError: true,
								// max: currentDate.getFullYear(),
								labelClassName: "text-[16px]",
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
