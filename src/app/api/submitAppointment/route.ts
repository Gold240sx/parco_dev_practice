import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, res: NextResponse) {
	if (req.method === "POST") {
		try {
			const payload = await req.json()

			console.log("Request Method", req.method)
			console.log("Request Body", req.body)
			console.log("Payload", payload)

			// Simulate posting to an external URL
			const postURL = "http://localhost:3001/api/appointments"

			const response = await fetch(postURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(payload),
			})

			if (!response.ok) {
				throw new Error("Failed to post appointment details")
			}

			return NextResponse.json({
				message: "Appointment details submitted successfully",
			})
		} catch (error) {
			return NextResponse.json(
				{ error: (error as Error).message },
				{ status: 500 }
			)
		}
	} else {
		return NextResponse.json(
			{ message: "Invalid request method" },
			{ status: 405 }
		)
	}
}
