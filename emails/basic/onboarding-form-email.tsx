import * as React from "react"

interface EmailTemplateProps {
	firstName: string
	lastName: string
	phoneNumber: string
	email: string
	dob: string
	age: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
	firstName,
	email,
	phoneNumber,
	dob = undefined, // optional, default value is undefined
	age = undefined, // optional, default value is undefined
}) => (
	<div>
		<h1>Welcome, {firstName}!</h1>
		<p>From: {email}</p>
		<p>Phone Number: {phoneNumber}</p>
		{dob && <p>Date of Birth: {dob}</p>}
		{age && <p>Age: {age}</p>}
	</div>
)

export default EmailTemplate
