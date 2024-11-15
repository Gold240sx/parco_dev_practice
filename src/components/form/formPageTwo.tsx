import React, { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import TimeInput from "./inputs/timeInput"
import SelectInput from "./inputs/selectInput"
import RadioCardInputGrouping from "./inputs/radioCardInputGrouping"

type FormPageTwoProps = {
	props: {
		register: any
		watch: any
		errors: any
	}
}

const FormPageTwo = ({ props }: FormPageTwoProps) => {
	const [date, setDate] = useState<Date | undefined>(new Date())

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
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					fromDate={new Date()}
					toDate={addOneMonthToCurrentDate()}
					className=""
				/>
			</div>
			{/* <TimeInput /> */}
			<SelectInput
				props={{
					name: "timeSlot",
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
			<RadioCardInputGrouping />
		</div>
	)
}

export default FormPageTwo
