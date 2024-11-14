"use client"
import React, { useState } from "react"
import FormPageOne from "./formPageOne"
import MultiPageFormButtons from "./multiPageFormButtons"
import { useForm, SubmitHandler } from "react-hook-form"
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
			className={`${className} bg-white px-[60px] h-screen pt-[60px] text-black`}>
			<h5 className="text-3xl font-bold mb-4 text-balance">
				Let&apos;s start with the basic information
			</h5>
			<p className="body1">
				First we need to know your name, phone number, and birthday
			</p>
			{/* Gap - 20px between inputs */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormPageOne props={{ nosyAgeField, setNosyAgeField }} />
				<FormPageTwo props={{ register, watch, errors }} />
			</form>
			<MultiPageFormButtons
				props={{
					buttonClassName: `py-3.5 px-[10p] pt-[20px]`,
				}}
			/>
		</div>
	)
}

export default FormBody
