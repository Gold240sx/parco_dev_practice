// @ts-nocheck
import React from "react"

const DobErrors = ({ errors }: { errors: any }) => {
	return (
		<div>
			<div className={`${!errors?.dob?.month && "hidden"} `}>
				{errors?.dob?.month && (
					<p className="text-red-500 px-[14px]">
						{errors.dob.month && "DOB: Month - "}
						{errors.dob.month?.message}
					</p>
				)}
			</div>

			<div className={`${!errors?.dob?.day && "hidden"} `}>
				{errors?.dob?.day && (
					<p className="text-red-500 px-[14px]">
						{errors.dob.day && "DOB: Day - "}
						{errors.dob.day?.message}
					</p>
				)}
			</div>

			<div className={`${!errors?.dob?.year && "hidden"} `}>
				{errors?.dob?.year && (
					<p className="text-red-500 px-[14px]">
						{errors.dob.year && "DOB: Year - "}
						{errors.dob.year?.message}
					</p>
				)}
			</div>
			{errors?.dob?.message && typeof errors.dob.message === "string" && (
				<p className="text-red-500 px-[14px]">
					Hidden DOB - {errors.dob.message}
				</p>
			)}
		</div>
	)
}

export default DobErrors
