import React from "react"
import { Label } from "@/components/ui/label"
import { AiFillQuestionCircle } from "react-icons/ai"
import { capitalize } from "@/functions/capitalize"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"

type requiredPosition = "inline-pre" | "inline" | "inline-end"
type requiredLabel = "shown" | "hidden"

type InputLabelStyleType = {
	labelClassName: string
}

type InputLabelProps = {
	props: {
		label: string
		name: string
		required: boolean
		labelClassName?: string
		requiredPosition: requiredPosition
		requiredLabel: InputLabelStyleType
		hasQuestionTooltip: boolean
		tooltipText?: string
	}
}

const InputLabel = ({ props }: InputLabelProps) => {
	const {
		label,
		name,
		required,
		labelClassName,
		requiredPosition = "inline",
		requiredLabel,
		hasQuestionTooltip,
		tooltipText,
	} = props
	return (
		<Label htmlFor={name} className={`flex gap-2 ${labelClassName}`}>
			<p
				className={`font-normal ${requiredLabel.labelClassName} w-fit text-[18px]`}>
				{capitalize(label)}
			</p>
			{required && (
				<p className={`${requiredPosition} my-auto`}>
					<span className={`text-red-400 font-normal text-[18px]`}>
						*
					</span>
				</p>
			)}
			{hasQuestionTooltip && tooltipText && tooltipText.length > 0 && (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<AiFillQuestionCircle
								className="text-[#262627]"
								size={18}
							/>
						</TooltipTrigger>
						<TooltipContent className="p-4 bg-zinc-800 text-balance max-w-[250px] ">
							<p className="flex-wrap text-[18px] leading-6 text-center">
								{tooltipText}
							</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			)}
		</Label>
	)
}

export default InputLabel
