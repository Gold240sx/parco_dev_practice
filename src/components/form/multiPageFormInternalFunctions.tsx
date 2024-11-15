import { Dispatch, SetStateAction, ReactNode } from "react"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

const useFormBlurTracker = (onBlur: () => void) => {
	const { formState } = useFormContext()
	const [hasBlurred, setHasBlurred] = useState(false)

	useEffect(() => {
		if (Object.keys(formState.touchedFields).length > 0) {
			setHasBlurred(true)
			if (onBlur) onBlur()
		}
	}, [formState.touchedFields, onBlur])

	return hasBlurred
}

export default useFormBlurTracker

const validateCurrentPageFn = async (
	trigger: UseFormReturn<any>["trigger"],
	currentPage: number,
	setPageValidity: Dispatch<SetStateAction<boolean[]>>
) => {
	const isValid = await trigger()
	setPageValidity((prev) => {
		const updatedValidity = [...prev]
		updatedValidity[currentPage] = isValid
		return updatedValidity
	})
	return isValid
}

const nextPage = async ({
	validateCurrentPageFn,
	currentPage,
	setCurrentPage,
	setDirection,
	setIsPreviewClick,
	getValues,
	formData,
	setFormData,
	children,
}: {
	validateCurrentPageFn: () => Promise<boolean>
	currentPage: number
	setCurrentPage: Dispatch<SetStateAction<number>>
	setDirection: Dispatch<SetStateAction<number>>
	setIsPreviewClick: Dispatch<SetStateAction<boolean>>
	getValues: UseFormReturn<any>["getValues"]
	formData: any
	setFormData: Dispatch<SetStateAction<any>>
	children: ReactNode[]
}) => {
	const isValid = await validateCurrentPageFn()
	if (isValid && currentPage < children.length - 1) {
		setDirection(1) // Moving forward
		setIsPreviewClick(false) // Regular navigation
		// Save the current page's form data before jumping to another page
		const currentPageData = getValues()
		setFormData({ ...formData, ...currentPageData })

		setCurrentPage((prev) => prev + 1)
	}
}

const prevPage = ({
	currentPage,
	setCurrentPage,
	setDirection,
	setIsPreviewClick,
	getValues,
	formData,
	setFormData,
}: {
	currentPage: number
	setCurrentPage: Dispatch<SetStateAction<number>>
	setDirection: Dispatch<SetStateAction<number>>
	setIsPreviewClick: Dispatch<SetStateAction<boolean>>
	getValues: UseFormReturn<any>["getValues"]
	formData: any
	setFormData: Dispatch<SetStateAction<any>>
}) => {
	if (currentPage > 0) {
		setDirection(-1) // Moving backward
		setIsPreviewClick(false) // Regular navigation

		// Save the current page's form data before jumping to another page
		const currentPageData = getValues()
		setFormData({ ...formData, ...currentPageData })

		setCurrentPage((prev) => prev - 1)
	}
}

const jumpToPage = ({
	index,
	currentPage,
	setIsPreviewClick,
	getValues,
	formData,
	setFormData,
	pageValidity,
	setCurrentPage,
}: {
	index: number
	currentPage: number
	setIsPreviewClick: Dispatch<SetStateAction<boolean>>
	getValues: UseFormReturn<any>["getValues"]
	setFormData: Dispatch<SetStateAction<any>>
	formData: any
	pageValidity: boolean[]
	setCurrentPage: Dispatch<SetStateAction<number>>
}) => {
	if (index <= currentPage || pageValidity[currentPage]) {
		setIsPreviewClick(true) // Set fade transition rather than horizontal transition
		// Save the current page's form data before jumping to another page
		const currentPageData = getValues()
		setFormData({ ...formData, ...currentPageData })
		setCurrentPage(index)
	}
}

const handleFullSubmit = async ({
	getValues,
	formData,
	schemas,
	children,
	onSubmit,
	reset,
	setFormData,
	setCurrentPage,
	setPageValidity,
}: {
	getValues: UseFormReturn<any>["getValues"]
	formData: any
	schemas: z.ZodSchema<any>[]
	children: ReactNode[]
	onSubmit: (data: any) => Promise<void>
	reset: UseFormReturn<any>["reset"]
	setFormData: Dispatch<SetStateAction<any>>
	setCurrentPage: Dispatch<SetStateAction<number>>
	setPageValidity: Dispatch<SetStateAction<boolean[]>>
}) => {
	// Collect all form data from the current page
	const currentPageData = getValues()
	const fullFormData = {
		...formData,
		...currentPageData,
	}

	// Combine all schemas
	const allSchemas = z.object(
		schemas.reduce((acc, schema, idx) => {
			if (schema instanceof z.ZodObject) {
				return { ...acc, ...schema.shape }
			}
			return acc
		}, {})
	)

	const result = allSchemas.safeParse(fullFormData)
	// Validate all pages' schema
	if (result.success) {
		try {
			await onSubmit(fullFormData) // All pages valid, submit full form data
		} catch (error) {
			console.error(error)
		} finally {
			// IMPORTANT DEV NOTE:
			// UNCOMMENT THIS OUT IF YOU WANT TO  AUTMATICALLY RESET THE FORM AFTER SUBMISSION
			// reset() // Reset the form after submission
			// setFormData({}) // Reset the form data
			// setCurrentPage(0) // Reset to the first page
			// setPageValidity(Array(children.length).fill(false)) // Reset page validity
		}
	} else {
		console.log(result.error.format()) // Handle schema validation errors
	}
}

// Page transition settings
const pageTransition = (currentPage: number) => ({
	duration: currentPage === 0 ? 0.7 : 0.5, // Longer duration for the first page
	ease: "easeInOut",
})

// Motion variants
const variants = ({
	direction,
	currentPage,
	isPreviewClick,
}: {
	direction: number
	currentPage: number
	isPreviewClick: boolean
}) => ({
	enter: {
		opacity: 0,
		x: currentPage === 0 || isPreviewClick ? 0 : direction > 0 ? 300 : -300,
		transition: {
			duration: 0.5, // Match with your pageTransition duration if needed
			ease: "easeInOut", // Smooth easing function
		},
	},
	center: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5, // Match with your pageTransition duration if needed
			ease: "easeInOut", // Smooth easing function
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.5, // Match with your pageTransition duration if needed
			ease: "easeInOut", // Smooth easing function
		},
	},
})

export const MultiPageFormInternalFunctions = {
	controls: {
		prevPage,
		nextPage,
		jumpToPage,
	},
	validate: validateCurrentPageFn,
	formSubmission: handleFullSubmit,
	useFormBlurTracker,
	animation: {
		pageTransition,
		variants,
	},
}
