"use client"

export const getLocalStorageData = (value : string) => {
    const storedData : string | null = localStorage.getItem(value)
    if (typeof window !== 'undefined') {
        if (storedData) {
            const parsed = JSON.parse(storedData)
            if (Array.isArray(parsed)) {
                return parsed 
            }
        }
    }
    return []
}