import { date, z } from "zod"
import { validUSAreaCodes } from "@/types/arrayLists/validUSAreaCodes"

export const dateOfBirthSchema = z.object({
	day: z.string().min(2, { message: "Required" }).max(31),
	month: z.string().min(2, { message: "Required" }).max(12),
	year: z
		.string()
		.min(4, { message: "Year must be exactly 4 digits" })
		.refine(
			(value) =>
				Number(value) > 1900 &&
				Number(value) < new Date().getFullYear(),
			{
				message: "Year must be between 1900 and the current year",
			}
		),
})

export const age = z.number().int().min(18).max(120)
export const platformSchema = z.enum(["zoom", "google_meet", "teams"])

export const pageOneSchema = z
	.object({
		firstName: z
			.string()
			.min(2)
			.max(255)
			.refine((value) => {
				return /^[A-Za-z\s]+$/.test(value)
			}),
		lastName: z
			.string()
			.min(2)
			.max(255)
			.refine((value) => {
				return /^[A-Za-z\s]+$/.test(value)
			}),
		email: z.string().email(),
		phoneNumber: z
			.string()
			.length(14, "Phone number must be exactly 10 digits")
			.regex(
				/^\(\d{3}\) \d{3}-\d{4}$/,
				"Phone number can only contain digits, spaces, hyphens, and parentheses"
			)
			.refine(
				(value) => validUSAreaCodes.includes(value.substring(1, 4)),
				{
					message: "Invalid area code",
				}
			)
			.refine((value) => !/(\d)\1{9}/.test(value), {
				message:
					"Phone number cannot contain all the same digits (e.g., 0000000000)",
			}),
		dob: dateOfBirthSchema.optional(),
		age: age.optional(),
	})
	.refine((data) => data.dob || data.age, {
		message: "Either date of birth or age is required.",
		path: ["dob", "age"], // Attach error to both fields if neither is provided
	})

export const pageTwoSchema = z.object({
	appointmentDate: date(),
	timeSlot: z.string().min(1),
	platform: platformSchema,
})

export const totalFormSchema = z.union([pageOneSchema, pageTwoSchema])
export type OnboardingFormInputs = z.infer<typeof totalFormSchema>
