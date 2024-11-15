"use client"
import React, { useState, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import TextInput from "@/components/form/inputs/textInput"
import DOBInputGroup from "@/components/form/inputs/dobInputGroup"
import PhoneNumberInput from "@/components/form/inputs/phoneNumberInput"
import { pageOneSchema } from "../formSchema"
import DobErrors from "../dobErrors"

export const Step1 = () => {
	const currentDate = useMemo(() => new Date(), [])
	const [nosyAgeField, setNosyAgeField] = useState(false)
	const {
		getValues,
		formState: { errors },
	} = useFormContext()

	const isUnderDevelopment = true

	return (
		<div className="text-[18px] space-y-[20px]">
			<h5 className="text-[24px] text-balance font-[500]">
				Let&apos;s start with the basic information
			</h5>
			<p className="body1 text-[#495057]">
				First we need to know your name, phone number, and birthday
			</p>
			<div className=" flex flex-col gap-[20px]">
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

				{nosyAgeField === false ? (
					<div className="flex flex-col gap-1">
						<DOBInputGroup props={{ currentDate }} />
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
					onClick={() => setNosyAgeField(!nosyAgeField)}
					className="  cursor-pointer rounded-md !-mt-2 mx-[14px] flex mr-auto w-fit">
					<p className="hover:underline !text-sky-500 underline-offset-2 !decoration-sky-500 w-fit text-[16px]">
						{nosyAgeField
							? "Enter date instead"
							: "Use my age instead?"}
					</p>
				</button>

				{isUnderDevelopment && getValues().error && (
					<button className="bg-red-500 text-white rounded px-4 py-2 mt-4">
						Show Errors
					</button>
				)}
				<DobErrors errors={errors} />
			</div>
		</div>
	)
}

// Schema  step 1 should either be residential or company
export const schemaStep1 = pageOneSchema
