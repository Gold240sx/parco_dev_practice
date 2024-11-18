"use server"
import { Resend } from "resend"
import { NextResponse, NextRequest } from "next/server"
import React from "react"

// Import your email templates
import {
	ParcoOnboardingEmail,
	BasicEmailTemplate,
} from "../../../../emails/parco/_index"

// Initialize Resend
const resend = new Resend(process.env.NEXT_RESEND_API_KEY)

// Map of available templates
const emailTemplates: { [key: string]: React.ComponentType<any> } = {
	ParcoOnboardingEmail,
	BasicEmailTemplate,
}

type EmailGroupPropType = {
	label: string
	from: string
	to: string | string[]
	text: string
	replyTo?: string
	emailTemplate: string // Template name
	templateProps: any // Props for the template
	cc?: string | string[]
	bcc?: string | string[]
	subject: string
}[]

const SendAllEmails = async (emailGroup: EmailGroupPropType) => {
	const errors: Array<{ label: string; error: any }> = []

	// Render the email templates dynamically
	const emails = emailGroup.map((email) => {
		const TemplateComponent = emailTemplates[email.emailTemplate]

		if (!TemplateComponent) {
			errors.push({
				label: email.label,
				error: `Template ${email.emailTemplate} not found.`,
			})
			return null
		}

		return {
			from: email.from,
			to: email.to,
			subject: email.subject,
			replyTo: email.replyTo || email.from,
			cc: email.cc,
			bcc: email.bcc,
			text: email.text,
			react: React.createElement(TemplateComponent, email.templateProps), // Dynamically render the template
		}
	})

	type CreateEmailOptions = {
		from: string
		to: string | string[]
		subject: string
		replyTo: string
		cc: string | string[]
		bcc: string | string[]
		text: string
		react: React.ReactElement
	}

	// Filter out null emails (in case of template not found)
	const validEmails: CreateEmailOptions[] = emails.filter(
		(email): email is CreateEmailOptions => email !== null
	)

	try {
		await resend.batch.send(validEmails)
	} catch (error) {
		errors.push({ label: "Batch Send Failed", error })
		console.log("Error", error)
	}

	return { success: errors.length === 0, errors }
}

export async function POST(req: NextRequest) {
	const emailGroup: EmailGroupPropType = await req.json()

	try {
		const result = await SendAllEmails(emailGroup)
		return NextResponse.json(result)
	} catch (error) {
		console.error("Error sending emails:", error)
		return NextResponse.json({ success: false, error })
	}
}

// Example usage:
{
	/* 
	const emailsToSend = [
  {
    label: "Client Email",
    emailDestination: "client@example.com",
    emailTemplate: "DGPDataRecieved",
	emailSubject: "Project Update",
	templateProps: {
	  projectName: "David's Garage Pro",
	  projectStatus: "In Progress",
	  projectDueDate: "2022-12-31",
	},
    cc: ["assistant@example.com"],
    emailSubject: "Project Update",
  },
  {
    label: "Internal Email",
    emailDestination: "you@example.com",
    emailTemplate: <InternalTemplate {...props} />,
  }
]

const { success, errors } = await SendAllEmails(emailsToSend)
if (success) {
  console.log("All emails sent successfully!")
} else {
  console.log("Some emails failed to send:", errors)
  // Handle errors as needed
}

*/
}
