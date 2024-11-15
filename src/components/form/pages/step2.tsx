"use client"
import React, { useState } from "react"
import RadioCardInputGrouping from "../inputs/radioCardInputGrouping"
import { pageTwoSchema } from "../formSchema"
import { useFormContext, Controller } from "react-hook-form"
import { Calendar } from "@/components/ui/calendar"
import SelectInput from "../inputs/selectInput"

export const Step2 = () => {
	const [date, setDate] = useState<Date | undefined>(new Date())
	const {
		control,
		formState: { errors },
	} = useFormContext()

	const addOneMonthToCurrentDate = () => {
		const currentDate = new Date()
		const newDate = new Date(
			currentDate.setMonth(currentDate.getMonth() + 1)
		)
		return newDate
	}

	return (
		<div className="space-y-4">
			<h5 className="text-3xl mb-4 text-balance font-[500]">
				Appointment Details
			</h5>
			<div className="w-full justify-center items-center flex">
				<Controller
					name="date"
					control={control}
					render={({ field }) => {
						const { value, onChange } = field
						return (
							<div>
								<Calendar
									mode="single"
									selected={value}
									onSelect={onChange} // Update react-hook-form state
									fromDate={new Date()}
									toDate={addOneMonthToCurrentDate()}
									className="border border-gray-300 rounded-lg shadow-sm"
								/>
								{errors.date && (
									<p className="text-red-500 text-sm mt-1">
										{typeof errors.date?.message ===
											"string" && errors.date?.message}
									</p>
								)}
							</div>
						)
					}}
				/>
			</div>
			{/* <TimeInput /> */}
			<SelectInput
				props={{
					name: "time",
					isMulti: false,
					label: "What time works best on the day selected?",
					required: true,
					options: [
						{
							value: "8-10",
							label: "8:00 AM - 10:00 AM",
						},
						{
							value: "10-12",
							label: "10:00 AM - 12:00 PM",
						},
						{
							value: "12-2",
							label: "12:00 PM - 2:00 PM",
						},
						{
							value: "2-4",
							label: "2:00 PM - 4:00 PM",
						},
						{
							value: "4-6",
							label: "4:00 PM - 6:00 PM",
						},
					],
					placeholder: `Select a time slot for ${date?.toDateString()}`,
					className: "col-span-1",
					tooltipText: "The day you were born",
				}}
			/>
			<RadioCardInputGrouping name="platform" label="Platform" />
		</div>
	)
}

// Schema  step 1 should either be residential or company
export const schemaStep2 = pageTwoSchema
