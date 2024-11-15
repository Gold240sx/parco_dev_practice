"use client"
import { useState, useEffect, useRef, KeyboardEvent, ReactNode } from "react"
import { useForm, FormProvider, FieldValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZodSchema } from "zod"
import { FormPreview } from "./multiPageFormPreview"
import MultiPageBackNextButtons from "./multiPageBackNextButtons"
import { MultiPageFormInternalFunctions } from "./multiPageFormInternalFunctions"
import { totalFormSchema as MultiPageFormProps } from "./formSchema"

// import { FormPreview } from "./MultiPageFormPreview"
import MultiPageFormButtons from "./multiPageFormButtons"

import React from "react"

export const MultiPageForm = <T extends FieldValues>({
	schemas,
	pageNames,
	children,
	onSubmit,
	setModalOpen = () => {},
	isReadyToClosePostForm,
	confirmPageChildren,
	options = {},
	postFormChildren,
	isUnderDevelopment,
}: MultiPageFormProps<T>) => {
	const backButtonRef = useRef<HTMLButtonElement>(null)
	const nextButtonRef = useRef<HTMLButtonElement>(null)
	const submitButtonRef = useRef<HTMLButtonElement>(null)
	const [formData, setFormData] = useState<T>({} as T) // Accumulate form data
	const [currentPage, setCurrentPage] = useState(0)
	const [isPreviewClick, setIsPreviewClick] = useState(false) // Track if navigation is from the FormPreview
	const [direction, setDirection] = useState(1) // Direction of the form (1: Forward, -1: Backward)
	const [pageValidity, setPageValidity] = useState<boolean[]>( // Track validity per page
		Array(children.length).fill(false) || []
	)

	// Extract all Internal Functions
	const {
		controls: { nextPage, prevPage, jumpToPage },
		validate,
		formSubmission,
		useFormBlurTracker,
		animation: { pageTransition, variants },
	} = MultiPageFormInternalFunctions

	const {
		submitMultiple = true,
		showAllErrorsAtOnceOrOneAtATime = isUnderDevelopment ? "all" : "one",
	} = options

	// Provides the Page Names for the FormPreview component if the pageNames prop is not provided
	const combinedSchemaObject = schemas.reduce(
		(acc: Record<string, ZodSchema<T>>, schema, index) => {
			acc[`schemaStep${index + 1}`] = schema
			return acc
		},
		{} as Record<string, ZodSchema<T>>
	)

	const PageNames = pageNames || Object.keys(combinedSchemaObject)

	const methods = useForm<FormData>({
		resolver: zodResolver(schemas[currentPage]), // Current page's schema
		mode: "onChange", // Validate fields onBlur
		defaultValues: {
			...options.defaultValues,
		},
		criteriaMode: isUnderDevelopment // This helps create a better developer experience by showing all errors at once in development mode.
			? "all"
			: showAllErrorsAtOnceOrOneAtATime === "all"
			? "all"
			: "firstError",
	})

	const {
		trigger,
		handleSubmit,
		getValues,
		watch,
		setValue,
		control,
		formState,
		reset,
	} = methods

	useEffect(() => {
		const subscription = watch(async () => {
			const isValid = await trigger() // Revalidate the current page on any field change
			setPageValidity((prev) => {
				const updatedValidity = [...prev]
				updatedValidity[currentPage] = isValid // Update the current page validity
				return updatedValidity
			})
		})
		return () => subscription.unsubscribe() // Clean up the subscription when component unmounts
	}, [watch, trigger, currentPage])

	const wannaKeepPostFormOpen =
		isReadyToClosePostForm && isReadyToClosePostForm === true ? false : true

	return (
		<FormProvider {...methods}>
			{!formState.isSubmitSuccessful && (
				<form
					onSubmit={handleSubmit((data) => {
						// data only returns the current page's data
						const formValues = getValues()
						const completeFormData = { ...formData, ...formValues }
						console.log("CompleteFormdata", completeFormData)
						// console.log("data", data) // data only outputs the current page's data

						// Submit the form data
						formSubmission({
							formData: completeFormData,
							getValues,
							schemas: schemas,
							onSubmit,
							setFormData,
							setCurrentPage,
							setPageValidity,
							children,
							reset,
						})
					})}
					className="overflow-x-hidden w-auto items-start md:my-6 px-0 md:py-8 relative">
					{/* <FormPreview
						pageNames={PageNames}
						currentPage={currentPage}
						formState={formState}
						pageValidity={pageValidity}
						jumpToPage={(index: number) =>
							jumpToPage({
								index,
								currentPage,
								setIsPreviewClick,
								getValues,
								setFormData,
								formData,
								pageValidity,
								setCurrentPage,
							})
						}
					/> */}

					{/* Page Content */}
					<section
						id="multi-page_main-content"
						className={` ${
							formState.isSubmitting &&
							"animate-pulse cursor-wait"
						}`}>
						{/* <div className="bg-[#CBD1BB]/30 rounded-md px-4 pb-1 w-fit h-fit ml-auto shadow-inner shadow-black/5">
							<RequiredKeyBadge className=" text-red-600 align-middle pb-0 mb-0" />
						</div> */}

						<div key={currentPage} className="">
							{children[currentPage]}
						</div>
					</section>

					<MultiPageBackNextButtons
						props={{
							currentPage,
							children,
							backButtonRef,
							nextButtonRef,
							submitCount: formState.submitCount,
							submitButtonRef,
							formState,
							getValues,
							prevPage: () =>
								prevPage({
									currentPage,
									setCurrentPage,
									setDirection,
									setIsPreviewClick,
									getValues,
									formData,
									setFormData,
								}),
							nextPage: () =>
								nextPage({
									validateCurrentPageFn: async () => {
										const isValid = await trigger()
										setPageValidity((prev) => {
											const updatedValidity = [...prev]
											updatedValidity[currentPage] =
												isValid
											return updatedValidity
										})
										return isValid
									},
									currentPage,
									setCurrentPage,
									setDirection,
									setIsPreviewClick,
									getValues,
									formData,
									setFormData,
									children,
								}),
						}}
					/>
				</form>
			)}
			{formState.isSubmitSuccessful &&
				wannaKeepPostFormOpen &&
				!postFormChildren && (
					<div className="flex flex-col items-center justify-center min-h-full h-fit">
						{!confirmPageChildren && (
							<h2 className="text-4xl font-thin text-center mt-8">
								🇺🇸🇺🇸 Form Data Submitted Successfully! 🇺🇸🇺🇸
							</h2>
						)}
						{confirmPageChildren !== undefined && (
							<div className="my-4 w-full h-fit">
								{confirmPageChildren}
							</div>
						)}
						<button
							onClick={() => {
								reset() // Reset the form after submission
								setFormData({} as T) // Reset the form data
								setCurrentPage(0) // Reset to the first page
								setPageValidity(
									Array(children.length).fill(false)
								) // Reset page validity
								setModalOpen(false)
							}}
							className="bg-zinc-800 hover:bg-black text-white rounded px-4 py-2 mt-4 mb-3">
							I've scheduled my appointment / not ready to
							schedule (Close and reset form)
						</button>
						{submitMultiple && (
							<button
								onClick={() => {
									reset() // Reset the form after submission
									setFormData({} as T) // Reset the form data
									setCurrentPage(0) // Reset to the first page
									setPageValidity(
										Array(children.length).fill(false)
									) // Reset page validity
								}}
								className="bg-green-500 text-white rounded px-4 py-2 mt-4">
								Submit Another Form
							</button>
						)}
					</div>
				)}

			{/* Show Post Form Children */}
			{formState.isSubmitSuccessful &&
				wannaKeepPostFormOpen &&
				postFormChildren && (
					<div className="relative">{postFormChildren}</div>
				)}
		</FormProvider>
	)
}

export interface MultiPageFormProps<T extends FieldValues> {
	schemas: ZodSchema<T>[] // Array of schemas
	pageNames?: string[]
	children: ReactNode[]
	setModalOpen?: (isOpen: boolean) => void
	isReadyToClosePostForm?: boolean
	confirmPageChildren?: ReactNode
	postFormChildren?: ReactNode
	isUnderDevelopment?: boolean
	onSubmit: (data: FieldValues) => Promise<void> // Update the type of the onSubmit function
	options?: {
		prefersReducedMotion?: boolean
		defaultValues?: { [key: string]: any }
		submitMultiple?: boolean
		showAllErrorsAtOnceOrOneAtATime?: "all" | "firstError" | undefined
	}
}

export default MultiPageForm
