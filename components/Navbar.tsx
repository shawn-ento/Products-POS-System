"use client"

import { useTheme } from "@/context/ThemeContext"
import { RootState } from "@/redux/store"
import Link from "next/link"
import { useSelector } from "react-redux"

const Navbar : React.FC = () => {
    const {theme, toggleTheme} = useTheme()
    const cartItems = useSelector((store : RootState) => store.products.cartItems)

    return (
        <nav className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">POS System</h1>
            <div className="flex items-center space-x-4">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/products" className="hover:underline">Products</Link>
                <Link href="/cart" className="hover:underline">Cart ({cartItems.length})</Link>
                <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                <button
                onClick={() => toggleTheme()}
                className="bg-gray-200 dark:bg-gray-700 text-sm px-2 py-1 rounded"
                >
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
                </button>
            </div>
        </nav>
    )
}

export default Navbar