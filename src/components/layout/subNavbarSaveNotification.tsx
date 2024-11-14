"use client"
import React, { useState } from "react"
import { MdDownloading } from "react-icons/md"
import { BsFillCloudCheckFill } from "react-icons/bs"

const SubNavbarSaveNotification = ({ className }: { className: string }) => {
	const [progressSaving, setProgressSaving] = useState(true)
	const [progressSaved, setProgressSaved] = useState(false)

	return (
		<>
			{progressSaving && (
				<div className={`${className} animate-pulse`}>
					<div className={`w-full flex items-end`}>
						<div className="flex gap-2 text-[#495057] w-fit">
							<MdDownloading className="h-[24px] w-[24px] rotate-180" />
							<p className="body2">Saving your progress</p>
						</div>
					</div>
				</div>
			)}
			{progressSaved && (
				<div className={`${className}`}>
					<div className={`w-full flex items-end`}>
						<div className="flex gap-2 text-[#495057] w-fit">
							<BsFillCloudCheckFill className="h-[24px] w-[24px]" />
							<p className="body2">Your progress is saved</p>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default SubNavbarSaveNotification
