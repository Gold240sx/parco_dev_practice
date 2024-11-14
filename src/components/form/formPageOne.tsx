import React from "react"
import InputLabel from "./inputs/inputLabel"
import TextInput from "./inputs/textInput"

type FormPageOneProps = {
	props: {
		nosyAgeField: boolean
		setNosyAgeField: (value: boolean) => void
	}
}

const FormPageOne = ({ props }: FormPageOneProps) => {
	return (
		<div className="border border-black px-6 py-10 my-10 rounded-2xl">
			<TextInput
				props={{
					name: "firstName",
					label: "First Name",
					required: true,
				}}
			/>
		</div>
	)
}

export default FormPageOne
