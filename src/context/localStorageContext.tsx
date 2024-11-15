"use client"
import React, { createContext, useContext, useState, useEffect } from "react"

interface LocalStorageContextType {}

const LocalStorageContext = createContext<LocalStorageContextType | undefined>(
	undefined
)

export const LocalStorageProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	// Load data from local storage on component mount

	return (
		<LocalStorageContext.Provider value={{}}>
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
