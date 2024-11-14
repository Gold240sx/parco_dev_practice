"use client"
import React, { createContext, useContext, useState, useEffect } from "react"

interface LocalStorageContextType {
	theme: string
	updateTheme: (newTheme: string) => void
	cookieJar: {
		cookiesSaved: boolean
		neccessaryCookies: boolean
		functionalCookies: boolean
		analyticsCookies: boolean
	}
	updateCookieJar: (newCookies: {
		cookiesSaved: boolean
		neccessaryCookies: boolean
		functionalCookies: boolean
		analyticsCookies: boolean
	}) => void
	prefersReducedMotion: boolean
	updatePrefersReducedMotion: (value: boolean) => void
}

const LocalStorageContext = createContext<LocalStorageContextType | undefined>(
	undefined
)

export const LocalStorageProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [theme, setTheme] = useState<string>("light")
	const [prefersReducedMotion, setPrefersReducedMotion] =
		useState<boolean>(false)

	const [cookieJar, setCookieJar] = useState(() => {
		let storedCookieJar
		if (typeof window !== "undefined") {
			storedCookieJar = localStorage?.getItem("cookieJar")
		}
		if (storedCookieJar) {
			let updatedCookieJar = JSON.parse(storedCookieJar)
			updatedCookieJar.neccessaryCookies = true
			const newJar = JSON.stringify(updatedCookieJar)
			return JSON.parse(newJar)
		} else {
			return {
				cookiesSaved: false,
				neccessaryCookies: true,
				functionalCookies: false,
				analyticsCookies: false,
			}
		}
	})

	// Load data from local storage on component mount
	useEffect(() => {
		if (typeof window !== "undefined") {
			const savedTheme = localStorage.getItem("theme")
			if (savedTheme) {
				setTheme(savedTheme)
			}

			const savedReducedMotion = localStorage.getItem(
				"prefersReducedMotion"
			)
			if (savedReducedMotion) {
				setPrefersReducedMotion(savedReducedMotion === "true")
			}

			const savedCookieJar = localStorage.getItem("cookieJar")
			if (savedCookieJar) {
				setCookieJar(JSON.parse(savedCookieJar))
			}
		}
	}, [])

	const updateTheme = (newTheme: string) => {
		setTheme(newTheme)
		if (typeof window !== "undefined") {
			localStorage.setItem("theme", newTheme)
		}
	}

	const updatePrefersReducedMotion = (value: boolean) => {
		setPrefersReducedMotion(value)
		if (typeof window !== "undefined") {
			localStorage.setItem("prefersReducedMotion", value.toString())
		}
	}

	const updateCookieJar = (newCookies: {
		cookiesSaved: boolean
		neccessaryCookies: boolean
		functionalCookies: boolean
		analyticsCookies: boolean
	}) => {
		setCookieJar(newCookies)
		if (typeof window !== "undefined") {
			localStorage.setItem("cookieJar", JSON.stringify(newCookies))
		}
	}

	const value: LocalStorageContextType = {
		theme,
		updateTheme,
		cookieJar,
		updateCookieJar,
		prefersReducedMotion,
		updatePrefersReducedMotion,
	}

	return (
		<LocalStorageContext.Provider value={value}>
			{children}
		</LocalStorageContext.Provider>
	)
}

export const useLocalStorage = () => {
	const context = useContext(LocalStorageContext)
	if (!context) {
		throw new Error(
			"useLocalStorage must be used within a LocalStorageProvider"
		)
	}
	return context
}
