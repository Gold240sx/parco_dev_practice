import React, {
	BaseSyntheticEvent,
	ReactNode,
	RefObject,
	useRef,
	useCallback,
	useState,
} from "react"
import { CgArrowLeft } from "react-icons/cg"
import { PacmanLoader } from "react-spinners"

// Trigger a client side Form submission limiter, to prevent more than one submission a week from the same ip address.

interface MultiPageBackNextButtonsProps {
	props: {
		currentPage: number
		children: ReactNode[]
		submitCount: number
		isUnderDevelopment?: boolean
		backButtonRef: RefObject<HTMLButtonElement>
		nextButtonRef: RefObject<HTMLButtonElement>
		submitButtonRef: RefObject<HTMLButtonElement>
		getValues: () => void
		handleSubmit?: (e?: BaseSyntheticEvent) => Promise<void>
		prevPage: ({
			currentPage,
			setCurrentPage,
			setDirection,
			setIsPreviewClick,
			getValues,
			formData,
			setFormData,
		}: any) => void
		nextPage: ({
			currentPage,
			setCurrentPage,
			setDirection,
			setIsPreviewClick,
			getValues,
			formData,
		}: any) => void
		formState: {
			isDirty: boolean
			isValid: boolean
			isSubmitting: boolean
			errors: any
		}
	}
}

const MultiPageBackNextButtons = ({ props }: MultiPageBackNextButtonsProps) => {
	const {
		currentPage,
		children,
		prevPage,
		nextPage,
		getValues,
		backButtonRef,
		nextButtonRef,
		submitButtonRef,
		isUnderDevelopment,
		submitCount,
		handleSubmit,
		formState: { isSubmitting, isDirty, isValid, errors },
	} = props

	const [allErrors, setAllErrors] = useState<any>({})
	const PageButtonStyles =
		"bg-[#344767] hover:bg-[#27354D] ease-in duration-100 transition-color text-white rounded-[8.8px] font-semibold font-inter text-[18px] body1 uppercase min-w-[108.64px] h-[52.8px] text-center"

	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	const debounce = useCallback((func: () => void, delay: number) => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
		timeoutRef.current = setTimeout(func, delay)
	}, [])

	const handlePrevPage = useCallback(() => {
		debounce(
			() =>
				prevPage({
					currentPage,
					setCurrentPage: () => {},
					setDirection: () => {},
					setIsPreviewClick: () => {},
					getValues: () => {},
					formData: {},
					setFormData: () => {},
				}),
			300
		)
	}, [prevPage, debounce, currentPage])

	const handleNextPage = useCallback(() => {
		debounce(
			() =>
				nextPage({
					currentPage,
					setCurrentPage: () => {},
					setDirection: () => {},
					setIsPreviewClick: () => {},
					getValues: () => {},
					formData: {},
				}),
			300
		)
	}, [nextPage])

	return (
		<div className="flex justify-between">
			{!isSubmitting && (
				<button
					type="button"
					id="back-button"
					onMouseDown={handlePrevPage}
					onTouchEnd={handlePrevPage}
					ref={backButtonRef}
					disabled={currentPage <= 0}
					className="flex items-center text-[18px] gap-2 cursor-pointer font-semibold uppercase hover:bg-gray-50 rounded-[8.8px] min-w-[108.64px] h-[52.8px] ease-in duration-100 transition-color pr-3 pl-4 disabled:opacity-0">
					<CgArrowLeft className="text-[#344767]" />
					<p className="text-[#344767]">Back</p>
				</button>
			)}
			{currentPage < children.length - 1 && (
				<button
					type="button"
					id="next-button"
					onMouseDown={handleNextPage}
					onClick={() => {
						if (isUnderDevelopment) {
							console.log("errors", errors)
							console.log("values", getValues())
						}
						handleNextPage()
					}}
					onTouchEnd={handleNextPage}
					ref={nextButtonRef}
					className={`${PageButtonStyles}`}>
					Next
				</button>
			)}
			{currentPage === children.length - 1 && !isSubmitting && (
				<button
					type="submit"
					id="submit-button"
					disabled={!isDirty || !isValid}
					className={`${PageButtonStyles}`}
					ref={submitButtonRef}>
					Submit
				</button>
			)}
			{currentPage === children.length - 1 && isSubmitting && (
				<button
					type="button"
					disabled
					className={`${PageButtonStyles}`}>
					<p>Submitting</p>
					<PacmanLoader
						size={12}
						cssOverride={{
							transform: "scaleX(-1)",
							marginTop: "4px",
						}}
					/>
				</button>
			)}
		</div>
	)
}

export default MultiPageBackNextButtons
