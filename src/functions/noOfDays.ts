const monthDays: { [key: string]: number } = {
	"01": 31,
	"02": 29, // Assume 29 days for February by default (leap year - post pick error validation being resolved by zod.)
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

const noOfDays = (
	month: keyof typeof monthDays,
	year: number | null = null
) => {
	// If month is February and year is provided, check for leap year
	if (month === "02" && year) {
		if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
			return Array.from({ length: 29 }, (_, i) => i + 1)
		}
		return Array.from({ length: 28 }, (_, i) => i + 1)
	}

	// Return days for the selected month
	return Array.from({ length: monthDays[month] }, (_, i) => i + 1)
}

export default noOfDays
