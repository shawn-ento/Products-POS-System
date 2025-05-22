"use client"

import AddProduct from "@/components/AddProduct"
import DashboardHome from "@/components/DashboardHome";
import SellingProducts from "@/components/SellingProducts";
import { useState } from "react"
import ManageProducts from "@/components/ManageProducts";
import AllProducts from "@/components/AllProducts";
import SaleReport from "@/components/SaleReport";

type Tabtypes = 'home' | 'add_product' | 'manage_product' | 'selling_products' | 'sale_report' | 'All_Products';

const Admin : React.FC = () => {
    const [tab, settab] = useState<Tabtypes>('home')

    const handleActiveTab = (tab : Tabtypes) => {
        settab(tab)
    }

    return (
        <>
            <div className="border w-full min-h-[calc(100dvh-60px)] flex">
                <div className="border max-w-[300px] w-full p-5">
                    <h1 className="text-[22px]">Product Dashboard</h1>
                    <ul className="p-2.5 [&>li]:relative [&>li]:before:absolute [&>li]:before:top-0 [&>li]:before:bg-[#f7f7f8] [&>li]:not-first:mt-[8px] [&>li]:before:rounded-[10px] [&>li]:before:left-[-10px] [&>li]:before:w-[3px] [&>li]:before:h-[100%] [&>li]:before:transition-opacity [&>li]:before:duration-300">
                        <li className={`${tab === 'home' ? 'before:opacity-80' : 'before:opacity-0'}`}>
                            <button
                                className={`cursor-pointer ${tab === 'home' ? 'bg-blue-900' : ''} p-[3px_12px] w-full text-left text-[18px] rounded-[10px]`}
                                onClick={() => handleActiveTab('home')}
                            >Home</button>
                        </li>
                        <li className={`${tab === 'All_Products' ? 'before:opacity-80' : 'before:opacity-0'}`}>
                            <button
                                className={`cursor-pointer ${tab === 'All_Products' ? 'bg-blue-900' : ''} p-[3px_12px] w-full text-left text-[18px] rounded-[10px]`}
                                onClick={() => handleActiveTab('All_Products')}
                            >All Products</button>
                        </li>
                        <li className={`${tab === 'manage_product' ? 'before:opacity-80' : 'before:opacity-0'}`}>
                            <button
                                className={`cursor-pointer ${tab === 'manage_product' ? 'bg-blue-900' : ''} p-[3px_12px] w-full text-left text-[18px] rounded-[10px]`}
                                onClick={() => handleActiveTab('manage_product')}
                            >Manage Product</button>
                        </li>
                        <li className={`${tab === 'add_product' ? 'before:opacity-80' : 'before:opacity-0'}`}>
                            <button
                                className={`cursor-pointer ${tab === 'add_product' ? 'bg-blue-900' : ''} p-[3px_12px] w-full text-left text-[18px] rounded-[10px]`}
                                onClick={() => handleActiveTab('add_product')}
                            >Add product</button>
                        </li>
                        <li className={`${tab === 'selling_products' ? 'before:opacity-80' : 'before:opacity-0'}`}>
                            <button
                                className={`cursor-pointer ${tab === 'selling_products' ? 'bg-blue-900' : ''} p-[3px_12px] w-full text-left text-[18px] rounded-[10px]`}
                                onClick={() => handleActiveTab('selling_products')}
                            >Selling Products</button>
                        </li>
                        <li className={`${tab === 'sale_report' ? 'before:opacity-80' : 'before:opacity-0'}`}>
                            <button
                                className={`cursor-pointer ${tab === 'sale_report' ? 'bg-blue-900' : ''} p-[3px_12px] w-full text-left text-[18px] rounded-[10px]`}
                                onClick={() => handleActiveTab('sale_report')}
                            >Sale Report</button>
                        </li>
                    </ul>
                </div>
                <div className="w-full border p-5">
                    {
                        tab === 'home' && (
                            <DashboardHome/>
                        ) 
                    }
                    {
                        tab === 'add_product' && (
                            <AddProduct/>
                        )
                    }
                    {
                        tab === 'manage_product' && (
                            <ManageProducts/>
                        )
                    }
                    {
                        tab === 'selling_products' && (
                            <SellingProducts/>
                        )
                    }
                    {
                        tab === 'sale_report' && (
                            <SaleReport/>
                        )
                    }
                    {
                        tab === 'All_Products' && (
                            <AllProducts/>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Admin