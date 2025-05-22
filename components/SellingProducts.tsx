import { getAllData, updateData } from "@/createAsyncthunk/createAsyncthunk"
import { addSoldProducts, decreaseSellQuantity, deleteSellProducts, increaseSellQuantity, ProductTypes, updateProductsQuantity, } from "@/redux/productSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const SellingProducts : React.FC = () => {
    const {products, sellItems} = useSelector((store : RootState) => store.products)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])

    const handleSellItems = (item : ProductTypes) => {
        const findUpdateProduct = products.find((element) => element._id === item._id)
        const soldProductDetails = {
            _id : item._id,
            productName : item.productName,
            quantity : item.quantity,
            price : item.price,
        }
        
        if (findUpdateProduct) {
            dispatch(updateProductsQuantity(soldProductDetails))
            dispatch(updateData({...item, id : item._id, quantity : findUpdateProduct.quantity - item.quantity}))
        }
        dispatch(addSoldProducts({...soldProductDetails, price : item.quantity * item.price}))
        dispatch(deleteSellProducts(item._id))
    }

    return (
        <>
            <div className="max-w-[1200px] mx-auto">
                <div className="mb-[12px]">
                    <h1 className="text-[22px] text-center">--- Selling Products ---</h1>
                </div>
                <table className="w-full border border-collapse">
                    <thead>
                        <tr className="[&>th]:border [&>th]:p-[4px_8px]">
                            <th className="w-[25%]"><h1>Product Name</h1></th>
                            <th className="w-[35%]"><h1>Description</h1></th>
                            <th className="w-[10%]"><h1>Price</h1></th>
                            <th className="w-[15%]"><h1>Quantity</h1></th>
                            <th className="w-[15%]"><h1>Actions</h1></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sellItems.length > 0 ? (
                                sellItems.map((item) => {
                                    return (
                                        <tr key={item._id} className="[&>td]:border [&>td]:p-4">
                                            <td>
                                                <div>
                                                    <h1 className="text-[17px] font-semibold">{item.productName}</h1>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <p className="text-[17px]">{item.description}</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center justify-center">
                                                    <span className="text-[19px] font-medium">{item.price * item.quantity}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center flex-col gap-[10px]">
                                                    <span className={`text-[17px]`}>{item.quantity} Product</span>
                                                    <div className="flex items-center gap-[10px]">
                                                        <button
                                                            className="border w-[30px] h-[30px] text-[20px] rounded-full cursor-pointer inline-flex justify-center items-center"
                                                            onClick={() => dispatch(increaseSellQuantity(item._id))}
                                                        >+</button>
                                                        <button
                                                            className="border w-[30px] h-[30px] text-[20px] rounded-full cursor-pointer inline-flex justify-center items-center"
                                                            onClick={() => dispatch(decreaseSellQuantity(item._id))}
                                                        >-</button>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex justify-center items-center gap-[6px]">
                                                    <button
                                                        className={`bg-blue-800 rounded-[10px] p-[2px_8px] ${item.quantity === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} text-[16px]`}
                                                        disabled={item.quantity === 0}
                                                        onClick={() => handleSellItems(item)}
                                                    >{item.quantity === 0 ? 'Out Of Stock' : 'Sell'}</button>
                                                    <button
                                                        className="bg-red-800 rounded-[10px] p-[2px_8px] text-[16px] cursor-pointer"
                                                        onClick={() => dispatch(deleteSellProducts(item._id))}
                                                    >Remove</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5}>
                                        <span className="inline-block w-full py-2.5 text-[20px] text-center">No Products</span>
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

export default SellingProducts