"use client"
import React, { useState } from "react"
import { ZodType } from "zod"
import MultiPageForm from "../form/multiPageForm"
import { FormPreview } from "../form/multiPageFormPreview"
import {
	Step1,
	schemaStep1,
	Step2,
	schemaStep2,
} from "@/components/form/pages/_index"
import Swal from "sweetalert2"
import { format } from "date-fns"
import Link from "next/link"
import { revalidatePath } from "next/cache"

const pageNames = ["Basic Information", "Appointment Details"] // Define the names (optional) // defaults to item names from Zod
const schemas: ZodType<any>[] = [schemaStep1, schemaStep2]
const isUnderDevelopment = process.env.REACT_APP_IS_UNDER_DEVELOPMENT === "true"

type OnboardingFormProps = {
	props: {
		setIsFormSubmitted?: (value: boolean) => void
		setModalOpen?: (isOpen: boolean) => void
		user: any
	}
}

const salesman = "Zach Burkland"

const OnboardingForm = ({ props }: OnboardingFormProps) => {
	const { setIsFormSubmitted, setModalOpen } = props
	const [isReadyToClosePostForm, setIsReadyToClosePostForm] = useState(false)

	const handleSubmit = async (data: any): Promise<any> => {
		// Set form submission state
		return new Promise<void>((resolve) => {
			const date = format(data.date, "MMMM do, yyyy")
			// Simulate server request with a delay
			setTimeout(async () => {
				console.log("Form Submitted", data)
				// await UploadDataToSupabase(data)
				Swal.fire({
					title: "Appointment Set!",
					showCloseButton: false,
					showConfirmButton: false,
					padding: "60px 80px",
					customClass: {
						popup: "custom-swal-popup",
					},
					html: `
							<p class="text-balance">
								Please check your email for the meeting link. You are booked for a 
								<b>Federal Consult on ${date} with ${salesman}</b>
							</p> 
							<br/><br/> 
							<div class="flex flex-col gap-4 md:flex-row sm:px-8 justify-between w-full align-middle items-center">
								<p>
									<b>Didn't get an email?</b>
								</p>
								<a target="_blank" href="/">
									<button class="bg-[#60BE64] text-white py-4 px-8 rounded-[8.8px] min-w-[137px] text-center font-semibold text-[18px] whitespace-nowrap">
										Create Account
									</button>
								</a>
							</div>`,
				})
				// Submission Form Function set to handleFullSubmit (search for)
				setIsFormSubmitted?.(true)
				resolve() // Resolve the promise after the delay
			}, 300)
		})
	}

	return (
		<div
			className={`col-span-1 bg-white min-w-[434px] place-items-center justify-center items-center px-[60px] min-h-screen pt-[60px] !space-y-[20px] !pb-[140px] text-black`}>
			<MultiPageForm
				schemas={schemas}
				isReadyToClosePostForm={isReadyToClosePostForm}
				pageNames={pageNames}
				isUnderDevelopment={isUnderDevelopment}
				options={{
					submitMultiple: false,
					defaultValues: {
						firstName: "John",
						lastName: "Smith",
						// phoneNumber: "(469) 269-9639",
						email: "john.doe@usda.com",
						dob: {
							// month: "01",
							// day: "01",
							year: "1960",
						},
						// age: 30,
					},
				}}
				setModalOpen={(isOpen: boolean) => setModalOpen?.(isOpen)}
				confirmPageChildren={
					<div className="w-full min-h-fit md:max-w-screen-md max-w-full mx-auto relative">
						{/* <FormPreview
							pageNames={pageNames}
							formState={{
								errors: {},
								isValid: true,
								isSubmitting: false,
							}}
							currentPage={4}
							pageValidity={[true, true, true, true]}
							jumpToPage={console.log}
						/> */}
						<div className="flex flex-col items-center justify-center">
							<h2 className="text-4xl font-base text-zinc-600 pt-4 text-center sm:text-left pb-4 md:pb-0">
								You are all set!
							</h2>
							<p className="pt-4">
								We will send you an email with the meeting link
								and confirmation details.
							</p>
							<Link href="/">
								<button
									onClick={() => window.location.reload()}
									className="bg-sky-500 text-white py-4 px-8 rounded-[8.8px] min-w-[137px] text-center font-semibold text-[18px] whitespace-nowrap mt-8">
									Go to Dashboard
								</button>
							</Link>
						</div>
					</div>
				}
				onSubmit={async (e: any): Promise<void> =>
					await handleSubmit(e)
				}>
				<Step1 />
				<Step2 />
			</MultiPageForm>
		</div>
	)
}

export default OnboardingForm
