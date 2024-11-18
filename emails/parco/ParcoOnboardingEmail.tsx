//@ts-nocheck
import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components"
import * as React from "react"
import { Tailwind } from "@react-email/tailwind"
import Copyright from "@/components/myComponents/Copyright"

const siteName = "Parco"

const tr = {
	borderTopStyle: "solid",
	borderTopWidth: "1px",
}

const borderLeft = (depth: number, position: string) => {
	// Define shadow properties based on the position
	let shadowX = "0"
	let shadowY = "0"
	if (position === "left") {
		shadowX = `-${depth * 2}px`
	} else if (position === "right") {
		shadowX = `${depth * 2}px`
	} else if (position === "top") {
		shadowY = `-${depth * 2}px`
	} else if (position === "bottom") {
		shadowY = `${depth * 2}px`
	}

	return {
		boxShadow: `${shadowX} ${shadowY} 0 rgba(0, 0, 0, 0.4)`,
	}
}

const baseUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: ""

const data = {
	firstName: "Troy",
	lastName: "Wilkins",
	email: "test@test.com",
	phoneNumber: "(473) 842-3819",
	currentTime: "8:00AM",
	currentDate: "11/18/24",
	time: "4:00PM",
	date: "01/10/25",
	platform: "google_meet",
}

const socialLinks = [
	{
		name: "Meta",
		href: "https://www.facebook.com/GoPARCO/",
		iconLink: "https://i.ibb.co/rGqY15X/Meta-White.png",
		icon: () => (
			<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
				<path
					fill="#34476"
					color="#34476"
					d="M5,19.5c0-4.6,2.3-9.4,5-9.4c1.5,0,2.7,0.9,4.6,3.6c-1.8,2.8-2.9,4.5-2.9,4.5c-2.4,3.8-3.2,4.6-4.5,4.6  C5.9,22.9,5,21.7,5,19.5 M20.7,17.8L19,15c-0.4-0.7-0.9-1.4-1.3-2c1.5-2.3,2.7-3.5,4.2-3.5c3,0,5.4,4.5,5.4,10.1  c0,2.1-0.7,3.3-2.1,3.3S23.3,22,20.7,17.8 M16.4,11c-2.2-2.9-4.1-4-6.3-4C5.5,7,2,13.1,2,19.5c0,4,1.9,6.5,5.1,6.5  c2.3,0,3.9-1.1,6.9-6.3c0,0,1.2-2.2,2.1-3.7c0.3,0.5,0.6,1,0.9,1.6l1.4,2.4c2.7,4.6,4.2,6.1,6.9,6.1c3.1,0,4.8-2.6,4.8-6.7  C30,12.6,26.4,7,22.1,7C19.8,7,18,8.8,16.4,11"
				/>
			</svg>
		),
	},
	{
		name: "X",
		href: "https://x.com/go_parco_?lang=en",
		iconLink: "https://i.ibb.co/TvMTP1V/Twitter-White.png",
		icon: (props: any) => (
			<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path
					fill="#34476"
					color="#34476"
					d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"
				/>
			</svg>
		),
	},
	{
		name: "Google Business",
		href: "https://www.google.com/search?q=goparco",
		iconLink: "https://i.ibb.co/hWyxdx3/Google-White.png",
		icon: (props: any) => (
			<svg
				viewBox="0 0 1024.00 1024.00"
				xmlns="http://www.w3.org/2000/svg">
				<path
					fill="#34476"
					color="#34476"
					d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm167 633.6C638.4 735 583 757 516.9 757c-95.7 0-178.5-54.9-218.8-134.9C281.5 589 272 551.6 272 512s9.5-77 26.1-110.1c40.3-80.1 123.1-135 218.8-135 66 0 121.4 24.3 163.9 63.8L610.6 401c-25.4-24.3-57.7-36.6-93.6-36.6-63.8 0-117.8 43.1-137.1 101-4.9 14.7-7.7 30.4-7.7 46.6s2.8 31.9 7.7 46.6c19.3 57.9 73.3 101 137 101 33 0 61-8.7 82.9-23.4 26-17.4 43.2-43.3 48.9-74H516.9v-94.8h230.7c2.9 16.1 4.4 32.8 4.4 50.1 0 74.7-26.7 137.4-73 180.1z"></path>
			</svg>
		),
	},
]

const renderData = (
	data: Record<string, any>,
	depth: number = 0
): JSX.Element[] => {
	const rows: JSX.Element[] = []
	for (const key in data) {
		const isObject = typeof data[key] === "object"
		const bgColorClass = `${
			depth === 0 && isObject
				? "bg-black"
				: `bg-zinc-${
						900 + depth * 100
				  } border-zinc-800 border-t text-zinc-${200 + depth * 100}`
		}`

		if (isObject) {
			rows.push(
				<tr key={key}>
					<td
						style={borderLeft(depth + 1)}
						colSpan={2}
						className={`px-4 py-2 shadow text-left uppercase text-lg border-zinc-800 border-t font-semibold border text-white ${bgColorClass}`}>
						{key}
					</td>
				</tr>
			)
			rows.push(...renderData(data[key], depth + 1)) // Increment the depth
		} else {
			rows.push(
				<tr key={key} className={`border-1 border-zinc-800 border-t `}>
					<td
						style={borderLeft(depth)}
						className={`px-4 py-2 font-semibold border-t-zinc-800 text-zinc-500 ${bgColorClass}`}>
						{key}
					</td>
					<td
						style={tr}
						className={`px-4 py-2 border-t-zinc-800 ${bgColorClass}`}>
						{data[key] === true
							? "TRUE"
							: data[key] === false
							? "FALSE"
							: data[key]}
					</td>
				</tr>
			)
		}
	}
	return rows
}

const renderedData = renderData(data)

interface EmailTemplateProps {
	firstName: string
	lastName: string
	phoneNumber: string
	email: string
	age: number
	dob: string
	date: string
	time: string
	platform: string
}

const ParcoOnboardingEmail: React.FC<Readonly<EmailTemplateProps>> = ({
	firstName,
	lastName,
	phoneNumber,
	email,
	age = "",
	dob = "",
	date,
	time,
	platform,
}) => {
	return (
		<Tailwind
			config={{
				theme: {
					extend: {
						colors: {
							brand: "#007291",
						},
					},
				},
			}}>
			<Html style={main} className="m-0 p-0">
				<Head />
				<Preview>
					Parco: {firstName || data.name} {lastName || data.lastName}{" "}
					- Onboarding
				</Preview>
				<Body
					style={main}
					className="bg-[#CAD3ED] md:pt-6 pb-0 w-full flex justify-center max-w-screen">
					<Container className="w-auto my-0 m-2 !rounded-xl overflow-hidden bg-zinc-100 md:mb-16">
						<Link
							href="https://www.goparco.com"
							className="text-center pt-6 pb-10 flex justify-center lg:justify-end items-center align-middle md:gap-4 bg-white">
							<Img
								src="https://static.wixstatic.com/media/859321_f17cf6ea29744a6cace4461651bf9fe9~mv2.png/v1/crop/x_0,y_10,w_2070,h_515/fill/w_434,h_108,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo_bluePARCOnotaglinePNG_edited_edited.png"
								alt="goparco.com"
								className="w-auto h-14 mt-4"
							/>
						</Link>
						<Section className=" py-0">
							<div className="flex justify-between p-4">
								<Text className="text-2xl font-thin text-zinc-700">
									User Details:
								</Text>
								<Text className="text-xl font-thin text-[#0A76AD]">
									{data.currentTime} - {data.currentDate}
								</Text>
							</div>
							<table className="p-2 text-black w-full">
								<thead className=""></thead>
								<tbody>
									{data.firstName && data.lastName && (
										<tr className="px-4 py-2 ml-2 font-semibold bg-zinc-200">
											<td className="px-4 py-2">Name</td>
											<td className="px-4 py-2 capitalize font-thin tracking-wide">
												{firstName || data.firstName}{" "}
												{lastName || data.lastName}
											</td>
										</tr>
									)}
									{data.email && (
										<tr className="px-4 py-2 ml-2 font-semibold bg-zinc-200">
											<td className="px-4 py-2">Email</td>
											<Link
												href={`mailto:${
													email || data.email
												}`}>
												<td className="px-4 py-2 font-thin tracking-wide">
													{email || data.email}
												</td>
											</Link>
										</tr>
									)}
									{data.phoneNumber && (
										<tr className="px-4 py-2 ml-2 font-semibold bg-zinc-200">
											<td className="px-4 py-2">
												Phone Number
											</td>
											<Link
												href={`tel:${
													phoneNumber ||
													data.phoneNumber
												}`}>
												<td className="px-4 cursor-pointer text-sky-500 py-2 font-thin tracking-wide">
													{phoneNumber ||
														data.phoneNumber}
												</td>
											</Link>
										</tr>
									)}
									{age && (
										<tr className="px-4 py-2 ml-2 font-semibold bg-zinc-200">
											<td className="px-4 py-2">Age</td>
											<td className="px-4 py-2 capitalize font-thin tracking-wide">
												{age || data.age}
											</td>
										</tr>
									)}
									{dob && (
										<tr className="px-4 py-2 ml-2 font-semibold bg-zinc-200">
											<td className="px-4 py-2">
												Date of birth
											</td>
											<td className="px-4 py-2 capitalize font-thin tracking-wide">
												{dob || data.dob}
											</td>
										</tr>
									)}
									{data.date && (
										<tr className="px-4 py-2 ml-2 font-semibold bg-zinc-200">
											<td className="px-4 py-2">
												Appointment Date
											</td>
											<td className="px-4 py-2 capitalize font-thin tracking-wide">
												{date || data.date}
											</td>
										</tr>
									)}
									{data.time && (
										<tr className="px-4 py-2 ml-2 font-semibold bg-zinc-200">
											<td className="px-4 py-2">
												Appointment Time
											</td>
											<td className="px-4 py-2 capitalize font-thin tracking-wide">
												{time || data.time}
											</td>
										</tr>
									)}
									{data.platform && (
										<tr className="px-4 py-2 ml-2 font-semibold bg-zinc-200">
											<td className="px-4 py-2">
												Platform
											</td>
											<td className="px-4 py-2 capitalize font-thin tracking-wide">
												{platform || data.platform}
											</td>
										</tr>
									)}
								</tbody>
							</table>

							<p className="px-5 text-zinc-400">
								Click a button below to set up the meeting in 1
								click.
							</p>
							<div className="grid grid-cols-1 w-auto md:grid-cols-3 px-4 gap-4 my-8 mx-2 sm:mx-4 md:mx-auto mb-12">
								<Button
									className={` text-center col-span-1 pt-2 ${
										data.platform === "zoom"
											? "bg-[#0A76AD] text-white"
											: "bg-zinc-200 text-zinc-800"
									}`}
									href={`#`}
									style={{
										borderRadius: "10px",
									}}>
									<Img
										src="https://i.ibb.co/GCMSTsh/zoom.png"
										className="max-h-10"
										alt="Zoom"
									/>
									<p className=" !text-center my-auto w-full h-fit mt-0.5 md:mt-0 py-4">
										Zoom
									</p>
								</Button>
								<Button
									className={`text-center flex items-center justify-center col-span-1 pt-2 ${
										data.platform === "google_meet"
											? "bg-[#0A76AD] text-white"
											: "bg-zinc-200 text-zinc-800"
									}`}
									href={`#`}
									style={{
										borderRadius: "10px",
									}}>
									<Img
										src="https://i.ibb.co/M7wHwH3/google-meet.png"
										className="max-h-10 w-auto flex mx-auto"
										alt="Google Meet"
									/>
									<p className="!text-center my-auto w-full h-fit mt-0.5 md:mt-0 py-4">
										Google Meet
									</p>
								</Button>
								<Button
									className={`text-center col-span-1 ${
										data.platform === "teams"
											? "bg-[#0A76AD] text-white"
											: "bg-zinc-200 text-zinc-800"
									}`}
									href={`#`}
									style={{
										borderRadius: "10px",
									}}>
									<Img
										src="https://i.ibb.co/PjXwrD6/ms-teams.png"
										className="!mt-2 max-h-10"
										alt="Teams"
									/>
									<p className="!text-center my-auto w-full h-fit mt-0.5 md:mt-0 py-4">
										Teams
									</p>
								</Button>
							</div>
						</Section>

						<Section id="footer" className="bg-zinc-200">
							<div className="flex flex-col w-full justify-center bg-[#344767]">
								<Link
									href="https://www.goparco.com"
									className="text-center flex justify-center lg:justify-end items-center align-middle md:gap-4">
									<Img
										src="https://static.wixstatic.com/media/859321_f17cf6ea29744a6cace4461651bf9fe9~mv2.png/v1/crop/x_0,y_10,w_2070,h_515/fill/w_434,h_108,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo_bluePARCOnotaglinePNG_edited_edited.png"
										alt="goparco.com"
										className="w-auto h-14 mt-4"
									/>
								</Link>
								<p className="text-center text-zinc-200">
									Retirement Americans trust
								</p>
								<Section>
									<div className="flex flex-col lg:flex-row  justify-end items-center">
										<Text className="text-xl text-[#6B92D4]">
											Follow us on social media!:{" "}
										</Text>
										<div className="flex justify-center items-center">
											{socialLinks.map((link, index) => (
												<Link
													key={index}
													href={link.href}
													className="mx-2">
													<Img
														src={link.iconLink}
														alt={link.name}
														className="w-6 h-auto max-h-6 md:w-5 my-auto flex"
													/>
												</Link>
											))}
										</div>
									</div>
								</Section>
								<div className="text-xs text-white">
									<Link
										href="https://www.michaelmartell.dev"
										className="no-underline text-white"
										target="_blank">
										<p className="text-center font-extralight !text-white group-hover:text-sky-200 text-sm tracking-widest group-hover:underline underline-offset-2">
											&copy;
											<span className="tracking-tighter pl-1 no-underline text-zinc-100 mr-1">
												2024
											</span>
											Pensioned Americans Retirement Co.
										</p>
									</Link>
								</div>
							</div>
						</Section>
					</Container>
				</Body>
			</Html>
		</Tailwind>
	)
}

export default ParcoOnboardingEmail

const main = {
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
	padding: "0",
	margin: "0",
}

const body = {
	padding: "0",
	margin: "0",
}

const hr = {
	margin: "20px 0",
}

const table = {
	display: "table",
	borderStyle: "solid",
	borderWidth: "1px",
	borderColor: "#000000",
}

const paragraph = {
	fontSize: "16px",
	lineHeight: "24px",
	textAlign: "left" as const,
}

const anchor = {
	color: "#0FB4CC",
}
