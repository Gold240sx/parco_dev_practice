import { date, z } from "zod"

export const dateOfBirthSchema = z.object({
	day: z.number().int().min(1).max(31),
	month: z.number().int().min(1).max(12),
	year: z.number().int().min(1900).max(new Date().getFullYear()),
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
