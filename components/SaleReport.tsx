"use client"
import { deleteSoldProducts } from "@/redux/productSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import GenerateProductReceipt from "./GenerateProductReceipt"

const SaleReport = () => {
    const {soldItems} = useSelector((store : RootState) => store.products)
    const dispatch = useDispatch<AppDispatch>()

    const totalPrice = soldItems.reduce((acc, elem) => {
        return acc  + elem.price
    }, 0)

    console.log(soldItems)
    return (
        <>
            <div className="max-w-[1200px] mx-auto">
                <div className="w-full mb-[30px]">
                    <h1 className="text-center text-[22px]">--- Products Sale Report ---</h1>
                    <div className="flex justify-between items-center mt-[10px]">
                        <h3 className="text-[19px] font-semibold">Generate Products Receipt</h3>
                        <GenerateProductReceipt/>
                    </div>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="[&>th]:p-[4px_12px] [&>th]:border-white [&>th]:border-b">
                            <th className="w-[25%] border-r"><h1 className="text-[17px]">Product Name</h1></th>
                            <th className="w-[25%] border-r"><h1 className="text-[17px]">Quantity</h1></th>
                            <th className="w-[25%] border-r"><h1 className="text-[17px]">Price</h1></th>
                            <th className="w-[25%]"><h1 className="text-[17px]">Actions</h1></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            soldItems.length > 0 ? (
                                soldItems.map((item) => {
                                    return (
                                        <tr key={item._id} className="[&>td]:p-[6px_10px] [&>td]:border-white [&>td]:border-b">
                                            <td className="border-r">
                                                <div>
                                                    <h1 className="text-center text-[17px] font-semibold">{item.productName}</h1>
                                                </div>
                                            </td>
                                            <td className="border-r">
                                                <div className="flex justify-center">
                                                    <span className="text-[17px]">{item.quantity}</span>
                                                </div>
                                            </td>
                                            <td className="border-r">
                                                <div className="flex justify-center">
                                                    <span className="text-[17px]">{item.price.toFixed(2)}$</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex justify-center">
                                                    <button
                                                        className="p-[1px_8px] rounded-[10px] font-semibold cursor-pointer bg-blue-800 hover:bg-blue-600"
                                                        onClick={() => dispatch(deleteSoldProducts(item._id))}
                                                    >X</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={4}>
                                        <span className="text-center inline-block py-2.5 text-[20px] w-full">No Sales</span>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={1} className="border-white border-r">
                                <h1 className="text-center text-[20px]">Total</h1>
                            </td>
                            <td colSpan={3}>
                                <span className="inline-flex w-full justify-center items-center font-semibold text-[20px]">{totalPrice.toFixed(2)}$</span>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </>
    )
}

export default SaleReport