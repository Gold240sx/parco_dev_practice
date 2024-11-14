import React from "react"
import { MdDownloading } from "react-icons/md"

const SubNavbarSaveNotification = ({ className }: { className: string }) => {
	return (
		<div className={`${className}`}>
			<div className={`w-full flex items-end`}>
				<div className="flex gap-2 text-[#495057] w-fit">
					<MdDownloading className="h-[24px] w-[24px] rotate-180" />
					<p className="body2">Saving your progress</p>
				</div>
			</div>
		</div>
	)
}

export default SubNavbarSaveNotification
