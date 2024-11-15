"use client"
import React, { useState, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import TextInput from "@/components/form/inputs/textInput"
import SelectInput from "../inputs/selectInput"
import DOBInputGroup from "@/components/form/inputs/dobInputGroup"
import PhoneNumberInput from "@/components/form/inputs/phoneNumberInput"
import { pageOneSchema } from "../formSchema"

export const Step1 = () => {
	const currentDate = useMemo(() => new Date(), [])
	const [nosyAgeField, setNosyAgeField] = useState(false)
	const {
		formState: { errors },
	} = useFormContext()

	return (
		<>
			<h5 className="text-3xl mb-4 text-balance font-[500]">
				Let&apos;s start with the basic information
			</h5>
			<p className="body1 text-[#495057]">
				First we need to know your name, phone number, and birthday
			</p>
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
					<p className="hover:underline !text-sky-500 underline-offset-2 !decoration-sky-500 w-fit">
						{nosyAgeField
							? "Enter date instead"
							: "Use my age instead?"}
					</p>
				</button>

				<div>
					{/* @ts-ignore */}
					{errors?.dob?.month && (
						<p className="text-red-500 px-[14px]">
							{/* @ts-ignore */}
							{errors.dob.month && "DOB: Month - "}
							{/* @ts-ignore */}
							{errors.dob.month?.message}
						</p>
					)}
				</div>
				<div>
					{/* @ts-ignore */}
					{errors?.dob?.day && (
						<p className="text-red-500 px-[14px]">
							{/* @ts-ignore */}
							{errors.dob.day && "DOB: Day - "}
							{/* @ts-ignore */}
							{errors.dob.day?.message}
						</p>
					)}
				</div>
				<div>
					{/* @ts-ignore */}
					{errors?.dob?.year && (
						<p className="text-red-500 px-[14px]">
							{/* @ts-ignore */}
							{errors.dob.year && "DOB: Year - "}
							{/* @ts-ignore */}
							{errors.dob.year?.message}
						</p>
					)}
				</div>
			</div>
		</>
	)
}

// Schema  step 1 should either be residential or company
export const schemaStep1 = pageOneSchema
