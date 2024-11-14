import React, { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

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
		<div>
			<h5 className="text-3xl mb-4 text-balance font-[500]">
				Appointment Details
			</h5>
			<Calendar
				mode="single"
				selected={date}
				onSelect={setDate}
				fromDate={new Date()}
				toDate={addOneMonthToCurrentDate()}
				className="!w-full"
			/>
		</div>
	)
}

export default FormPageTwo
