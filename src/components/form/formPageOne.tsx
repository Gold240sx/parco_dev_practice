import React from "react"
import TextInput from "./inputs/textInput"
import DOBInputGroup from "./inputs/dobInputGroup"
import PhoneNumberInput from "./inputs/phoneNumberInput"

type FormPageOneProps = {
	props: {
		nosyAgeField: boolean
		setNosyAgeField: (value: boolean) => void
	}
}

const FormPageOne = ({ props }: FormPageOneProps) => {
	return (
		<>
			<h5 className="text-3xl mb-4 text-balance font-[500]">
				Let&apos;s start with the basic information
			</h5>
			<p className="body1 text-[#495057]">
				First we need to know your name, phone number, and birthday
			</p>
			{/* <div className="border border-black px-6 py-10 my-10 rounded-2xl"> */}
			<div className=" flex flex-col gap-[20px] my-10">
				<TextInput
					props={{
						name: "firstName",
						placeholder: "John",
						label: "First Name",
						required: true,
						minLength: 2,
						maxLength: 50,
					}}
				/>
				<TextInput
					props={{
						name: "lastName",
						placeholder: "Smith",
						label: "Last Name",
						required: true,
						minLength: 2,
						maxLength: 50,
					}}
				/>
				<TextInput
					props={{
						name: "phoneNumber",
						placeholder: "(123) 456-6890",
						label: "Phone Number",
						required: true,
						type: "phone",
						questionMark: true,
						tooltipText:
							"A mobile or home phone number, whichever you're more likely to answer!",
					}}
				/>
				<PhoneNumberInput
					props={{
						name: "phoneNumber",
						label: "Phone Number",
						required: true,
						placeholder: "(123) 456-6890",
						questionMark: true,
						tooltipText:
							"A mobile or home phone number, whichever you're more likely to answer!",
					}}
				/>
				<TextInput
					props={{
						name: "email",
						placeholder: "john.doe@usda.com",
						questionMark: true,
						tooltipText: "Explaination here",
						label: "Email",
						type: "email",
						required: true,
					}}
				/>

				{props.nosyAgeField === false ? (
					<div className="flex flex-col gap-1">
						<DOBInputGroup />
					</div>
				) : (
					<TextInput
						props={{
							name: "age",
							label: "Potentially Nosy Field Name",
							type: "number",
							min: 18,
							max: 120,
							required: true,
							questionMark: true,
							placeholder: "57",
							tooltipText: "Explaination here",
						}}
					/>
				)}
				<button
					type="button"
					onClick={() => props.setNosyAgeField(!props.nosyAgeField)}
					className="  cursor-pointer rounded-md !-mt-2 mx-[14px] flex mr-auto w-fit">
					<p className="hover:underline !text-sky-500 underline-offset-2 !decoration-sky-500 w-fit">
						{props.nosyAgeField
							? "Enter date instead"
							: "Use my age instead?"}
					</p>
				</button>
			</div>
			{/* </div> */}
		</>
	)
}

export default FormPageOne
