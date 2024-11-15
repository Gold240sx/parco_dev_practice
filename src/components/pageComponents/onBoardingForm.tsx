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

const pageNames = ["Basic Information", "Appointment Details"] // Define the names (optional) // defaults to item names from Zod
const schemas: ZodType<any>[] = [schemaStep1, schemaStep2]

type OnboardingFormProps = {
	props: {
		setIsFormSubmitted?: (value: boolean) => void
		setModalOpen?: (isOpen: boolean) => void
		user: any
	}
}

const OnboardingForm = ({ props }: OnboardingFormProps) => {
	const { setIsFormSubmitted, setModalOpen } = props
	const [isReadyToClosePostForm, setIsReadyToClosePostForm] = useState(false)

	const handleSubmit = async (data: any): Promise<any> => {
		// Set form submission state
		return new Promise<void>((resolve) => {
			// Simulate server request with a delay
			setTimeout(async () => {
				console.log("Form Submitted", data)
				// await UploadDataToSupabase(data)

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
				isUnderDevelopment={false}
				options={{
					submitMultiple: false,
					defaultValues: {
						firstName: "John",
						lastName: "Smith",
						phoneNumber: "(469) 269-9639",
						email: "john.doe@usda.com",
						dob: {
							// month: "01",
							day: "01",
							year: "1990",
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
						<div className="flex flex-col items-center justify-center bg-zinc-100 p-6 rounded-md">
							<h2 className="text-4xl font-base text-zinc-600 pt-4 text-center sm:text-left pb-4 md:pb-0">
								Schedule your service with us directly below!{" "}
								<span className="text-sm text-center sm:text-right pt-2 mx-auto flex sm:ml-auto w-fit text-zinc-600">
									(yellow buttons)
								</span>
							</h2>
							<p className="pt-4">
								Can't schedule just yet? We'll send a link to
								your email to schedule just in case!
							</p>
							<hr className="my-4 bg-zinc-300 h-0.5 w-full" />
							<div className="flex flex-col gap-4 pt-4 md:grid md:grid-cols-4 justify-center items-center md:gap-10">
								<p className="text-md col-span-2 text-zinc-500">
									If you don't see a time that works for you,
									or if the scheduler fails to load, please
									call us to schedule an alternative time, and
									we'll do our best to accomidate. Thank you!
								</p>
								<button type="submit" className="col-span-1">
									Resubmit
								</button>
								{/* URL links */}
								<div className="flex flex-col col-span-2 gap-4 my-4">
									<div className="border border-zinc-300 p-3 rounded-md flex flex-col gap-4">
										<h2 className="text-md font-thin">
											Secure timeslot by Service Type:{" "}
										</h2>
									</div>
								</div>
							</div>
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
