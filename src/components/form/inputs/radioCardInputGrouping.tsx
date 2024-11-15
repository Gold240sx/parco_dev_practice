// Dependencies: pnpm install @remixicon/react

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useFormContext, Controller } from "react-hook-form"
import Image from "next/image"
import React, { useState } from "react"
import ZoomImage from "@/assets/brands/zoom_rect.svg"
import TeamsImage from "@/assets/brands/ms_teams.svg"
import GoogleMeetImage from "@/assets/brands/google_meets.svg"

const options = [
	{
		id: "radio-12-zoom",
		value: "zoom",
		image: ZoomImage,
		label: "Zoom",
	},
	{
		id: "radio-12-google-meet",
		value: "google_meet",
		image: GoogleMeetImage,
		label: "Google Meet",
	},
	{
		id: "radio-12-teams",
		value: "teams",
		image: TeamsImage,
		label: "Teams",
	},
]

export default function RadioCardInputGrouping({
	name,
	label,
}: {
	name: string
	label: string
}) {
	const {
		control,
		formState: { errors },
	} = useFormContext()

	return (
		<div className="space-y-2">
			<label className="block text-sm font-medium">{label}</label>
			<Controller
				name={name}
				control={control}
				defaultValue="zoom" // Default selected value
				render={({ field }) => {
					const { value, onChange } = field
					return (
						<RadioGroup
							className="flex !mt-[20px]"
							value={value}
							onValueChange={(newValue) => onChange(newValue)}>
							<div className="grid w-full sm:grid-cols-3 gap-2 place-items-center">
								{options.map((option) => (
									<div
										key={option.value}
										className="col-span-1 w-full sm:max-w-[153.33px] sm:max-h-[149px]">
										<label
											htmlFor={option.id}
											className={` ${
												value === option.value
													? "bg-[#0671AD]"
													: "hover:bg-gray-100"
											} relative flex cursor-pointer gap-4 flex-col items-center py-3 rounded-lg border border-input px-2 text-center shadow-sm shadow-black/5 ring-offset-background h-full has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/70 has-[:focus-visible]:ring-offset-2 ease-in duration-300 transition-colors`}>
											<RadioGroupItem
												id={option.id}
												value={option.value}
												className="sr-only after:absolute after:inset-0"
											/>
											<Image
												src={option.image}
												aria-hidden="true"
												alt={option.label}
												width={150}
												height={150}
												className="h-32 max-h-[89px]"
											/>
											<p
												className={`${
													value === option.value
														? "text-white"
														: ""
												} text-sm font-semibold leading-none text-foreground`}>
												{option.label}
											</p>
										</label>
									</div>
								))}
							</div>
						</RadioGroup>
					)
				}}
			/>
			{errors[name] && (
				<p className="text-red-500 text-sm mt-1">
					{errors[name] &&
						typeof errors[name].message === "string" &&
						errors[name].message}
				</p>
			)}
		</div>
	)
}
