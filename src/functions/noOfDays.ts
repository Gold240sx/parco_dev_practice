import React from "react"

const monthDays: { [key: string]: number } = {
	"01": 31,
	"02": 28,
	"03": 31,
	"04": 30,
	"05": 31,
	"06": 30,
	"07": 31,
	"08": 31,
	"09": 30,
	"10": 31,
	"11": 30,
	"12": 31,
}

const noOfDays = (month: keyof typeof monthDays) => {
	// If the month is February, check if it's a leap year
	if (month === "02") {
		const year = new Date().getFullYear()
		if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
			return 29
		}
	}

	// return the number of days into an array between 1 and the total number of days in the month

	return Array.from({ length: monthDays[month] }, (_, i) => i + 1)
}

export default noOfDays
