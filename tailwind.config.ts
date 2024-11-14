import type { Config } from "tailwindcss"
import { fontFamily } from "tailwindcss/defaultTheme"

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			fontFamily: {
				inter: ["Inter", ...fontFamily.sans],
				poppins: ["Poppins", ...fontFamily.sans],
			},
			fontSize: {
				"h1-mui": [
					"96px",
					{ lineHeight: "116.7%", letterSpacing: "-1.5px" },
				],
				"h2-mui": [
					"40px",
					{ lineHeight: "116.7%", letterSpacing: "0px" },
				],
				"h3-mui": [
					"32px",
					{ lineHeight: "116.7%", letterSpacing: "0px" },
				],
				"h4-mui": [
					"24px",
					{ lineHeight: "133.4%", letterSpacing: "0.25px" },
				],
				"h5-mui": [
					"24px",
					{ lineHeight: "133.4%", letterSpacing: "0px" },
				],
				body1: ["18px", { lineHeight: "normal", letterSpacing: "0px" }],
				body2: ["16px", { lineHeight: "normal", letterSpacing: "0px" }],
				"body2-medium": [
					"16px",
					{ lineHeight: "normal", letterSpacing: "0px" },
				],
				body3: ["14px", { lineHeight: "normal", letterSpacing: "0%" }],
				"body3-medium": [
					"14px",
					{ lineHeight: "normal", letterSpacing: "2%" },
				],
			},
			fontWeight: {
				light: "300",
				regular: "400",
				medium: "500",
				semiBold: "600",
				bold: "700",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config
