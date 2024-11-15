"use client"
import React, { useState } from "react"
import FormPageOne from "./formPageOne"
import MultiPageFormButtons from "./multiPageFormButtons"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { OnboardingFormInputs } from "./formSchema"
import { useToast } from "@/hooks/use-toast"
import FormPageTwo from "./formPageTwo"

const FormBody = ({ className }: { className: string }) => {
	const [page, setPage] = useState(1)
	const [nosyAgeField, setNosyAgeField] = useState(false)
	const { toast } = useToast()

	const {
		register,
		handleSubmit,
		watch,
		reset,
		formState: { errors },
	} = useForm<OnboardingFormInputs>()

	const onSubmit: SubmitHandler<OnboardingFormInputs> = (
		data: OnboardingFormInputs,
		e?: React.BaseSyntheticEvent
	) => {
		e?.preventDefault()
		const sendEmail = async ({
			data,
			reset,
		}: {
			data: OnboardingFormInputs
			reset: () => void
		}) => {
			try {
				await fetch("/api/send", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						// name: data.name,
						// email: data.email,
						// message: data.message,
					}),
				}).then((res) => {
					res.json()
					if (res.ok) {
						// toast.success("Message sent")
						toast({
							title: "Scheduled: Catch up",
							description: "Friday, February 10, 2023 at 5:57 PM",
						})
						reset()
					} else {
						// toast.error("Message not sent")
					}
				})
			} catch (error) {
				toast({
					title: "Error",
					description: "There was an error submitting the form data",
				})
				console.error(error)
			}
		}
		sendEmail({ data, reset })
	}

	return (
		<div
			className={`${className} bg-white min-w-[434px] place-items-center justify-center items-center px-[60px] min-h-screen pt-[60px] !space-y-[20px] !pb-[140px] text-black`}>
			{/* Gap - 20px between inputs */}
			<FormProvider {...useForm()}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<FormPageOne props={{ nosyAgeField, setNosyAgeField }} />
					<FormPageTwo props={{ register, watch, errors }} />
				</form>
			</FormProvider>
			<MultiPageFormButtons
				props={{
					buttonClassName: `py-3.5 px-[10p] pt-[20px] pb-24 h-fit`,
				}}
			/>
		</div>
	)
}

export default FormBody
