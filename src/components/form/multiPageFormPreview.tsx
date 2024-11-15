import { Fragment, useEffect } from "react"
// import {
// 	CheckCircleIcon,
// 	ExclamationCircleIcon,
// } from "@heroicons/react/20/solid"
// import { gsap } from "gsap"
// import { ScrollTrigger } from "gsap/ScrollTrigger"
// import { ScrollToPlugin } from "gsap/ScrollToPlugin"
/*  
	I've removed gsap, and the icons from the imports, since the form index seems to be 
	displaying in the layout slider, under the header, so page navigation, and icons are not needed.
*/

interface FormPreviewProps {
	pageNames: string[]
	formState: {
		errors: any
		isValid: boolean
		isSubmitting: boolean
	}
	currentPage: number
	pageValidity: boolean[] // Track validity of each page
	jumpToPage: (index: number) => void
}

export const FormPreview = ({
	pageNames,
	formState,
	pageValidity,
	currentPage,
	jumpToPage,
}: FormPreviewProps) => {
	useEffect(() => {
		const targetId = `page-button-${currentPage}`
		const targetElement = document.getElementById(targetId)

		// if (targetElement) {
		// 	// Smoothly scroll to the target element horizontally
		// 	gsap.to(".scroll-container", {
		// 		scrollTo: {
		// 			x: targetElement,
		// 			autoKill: false,
		// 		},
		// 		duration: 0.6,
		// 		ease: "power2.out",
		// 	})
		// }
	}, [currentPage])

	return (
		<div
			className={`border rounded-xl space-y-4 p-4 ${
				formState.isSubmitting && "animate-pulse cursor-wait"
			}`}>
			<h2 className="mx-4 text-2xl">Form Progress</h2>
			<div
				className={`gap-2 md:gap-4 min-h-fit rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800 sm:justify-center md:flex-row overflow-hidden ${
					formState.isSubmitting && "pointer-events-none"
				}`}>
				<div className="scroll-container flex flex-col md:space-x-1 md:flex-row overflow-x-scroll overflow-y-hidden scrollbar-hide align-middle items-center place-items-center">
					{pageNames.map((pageName, index) => {
						const isNotAccessible = !(
							pageValidity[index] || // it's the current page
							(pageValidity[currentPage] && // if the current page is 1 but page1 is valid, then we should be able to access page 2.
								index === currentPage + 1) ||
							(pageValidity[currentPage] && // if the current page is 1 but page1 and page2 are both valid, then we should be able to access page 3.
								index > currentPage + 1 &&
								pageValidity
									.slice(currentPage + 1, index)
									.every((valid) => valid))
						)
						const isValid = pageValidity[index]
						const isCurrent = index === currentPage

						const getTextColor = () => {
							if (isValid && isCurrent) {
								return "text-green-600"
							} else if (isValid) {
								return "text-green-500"
							} else if (isCurrent) {
								return "text-sky-400"
							} else {
								return "text-gray-400"
							}
						}

						const getDividerColor = () => {
							if (isValid && isCurrent) {
								return "bg-yellow-500 h-[2px] rounded-full"
							} else if (isValid) {
								return "bg-green-500 h-[2px] rounded-full"
							} else {
								return "bg-gray-400 h-px rounded-full"
							}
						}

						return (
							<Fragment key={index}>
								<button
									type="button"
									id={`page-button-${index}`}
									onClick={() =>
										!isNotAccessible && jumpToPage(index)
									}
									disabled={isNotAccessible} // Disable if the page is in the future and the current page is invalid
									className={`flex items-center space-2 px-4 rounded ${
										!isNotAccessible || isValid || isCurrent
											? "hover:bg-gray-100 focus:outline-none py-2"
											: " opacity-50 cursor-not-allowed py-2"
									}`}>
									<span
										className={`font-medium flex-wrap text-left ml-2 ease-in duration-300 transition-color ${getTextColor()}`}>
										{pageName}
									</span>
								</button>
								<div
									style={{ minWidth: "32px" }}
									className={` ${
										// Hide the last separator
										index !== pageNames.length - 1
											? " md:flex xl:w-16"
											: "hidden w-0"
									} md:w-8 hidden bg-gray-400 dark:bg-gray-700 ease-in duration-300 transition-all ${getDividerColor()}`}>
									&nbsp;
								</div>
							</Fragment>
						)
					})}
				</div>
			</div>
		</div>
	)
}
