import { getAllData } from "@/createAsyncthunk/createAsyncthunk"
import { addSellProducts, ProductTypes } from "@/redux/productSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const stockMessage = (quantity : number) : string => {
        let message = ''
        if (quantity === 0) {
            message = 'Out of stock'
        }
        else if (quantity <= 10) {
            message = 'Low stock'
        }
        else if (quantity > 10) {
            message = 'In stock'
        }
    return message
}

const AllProducts : React.FC = () => {
    const {products, loading, sellItems} = useSelector((store : RootState) => store.products)
    const dispatch = useDispatch<AppDispatch>()
    console.log('sell items ',sellItems)
    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])

    const handleBuyProducts = (item : ProductTypes) => {
        dispatch(addSellProducts(item))
        console.log('clicked')
    }

    if (loading) {
        return <div className="text-[22px] text-center max-w-[1000px] mx-auto">Loading...</div>
    }

    return (
        <>
            <div className="max-w-[1300px] mx-auto">
                <table className="w-full border border-collapse">
                    <thead>
                        <tr className="[&>th]:border [&>th]:p-[4px_8px]">
                            <th className="w-[25%]"><h1>Product Name</h1></th>
                            <th className="w-[35%]"><h1>Description</h1></th>
                            <th className="w-[15%]"><h1>Quantity</h1></th>
                            <th className="w-[10%]"><h1>Price</h1></th>
                            <th className="w-[15%]"><h1>Actions</h1></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.length > 0 ? (
                                products.map((item) => {
                                    return (
                                        <tr key={item._id} className="[&>td]:border [&>td]:p-4">
                                            <td>
                                                <div>
                                                    <h1 className="font-semibold text-[17px]">{item.productName}</h1>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <p className="text-[17px]">{item.description}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center justify-center gap-[6px]">
                                                    <span className="text-[18px]">{item.quantity}</span>
                                                    <span className={`border rounded-full text-[13px] p-[1px_3px] ${item.quantity === 0 ? 'text-amber-400' : item.quantity <= 10 ? 'text-red-700' : item.quantity > 10 ? 'text-blue-500' : ''}`}>
                                                        {
                                                            stockMessage(item.quantity)     
                                                        }
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center justify-center">
                                                    <span className="text-[18px]">{item.price.toFixed(2)}$</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex justify-center items-center">
                                                    <button
                                                        className={`bg-blue-800 text-[17px] ${item.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''} rounded-[10px] p-[3px_12px] cursor-pointer`}
                                                        disabled={item.quantity === 0}
                                                        onClick={() => handleBuyProducts(item)}
                                                    >{item.quantity === 0 ? 'Out of stock' : 'Buy'}</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5}>
                                        <span className="w-full text-[20px] text-center">No Products</span>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AllProducts