"use client";
import { getAllData } from "@/createAsyncthunk/createAsyncthunk";
import { addCartProduct } from "@/redux/productSlice";
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

const Products = () => {
    const productsData = useSelector((store : RootState) => store.products)
    const dispatch = useDispatch<AppDispatch>()
    const [searchProduct, setSearchProduct] = useState<string>('')

    useEffect(() => {
        dispatch(getAllData())

    }, [dispatch])

    const filterProducts = productsData.products.filter((item) => {
        return item.productName.trim().toLowerCase().includes(searchProduct.trim().toLowerCase())
    })

    console.log('product data ',productsData)

    const handleAddToCart = (items : {productName : string, _id : string, quantity : number, price : number, description : string}) => {
        dispatch(addCartProduct(items))
        console.log('cart products ',productsData)
    }

    if (productsData.loading) {
        return <div className="text-[24px] text-center max-w-[500px] mx-auto">Loading...</div>
    }
    console.log('search product ',searchProduct)
    return (
        <>
            <div className="max-w-[950px] mx-auto">
                <h1 className="text-center text-[22px]">Products</h1>
                <div className=" mt-[12px]">
                    <div className="max-w-[400px] mx-auto">
                        <input 
                            type="text" 
                            className="w-full p-[3px_15px] rounded-[10px] border outline-none text-[18px]"
                            placeholder="Search..." 
                            value={searchProduct}
                            onChange={(e : React.ChangeEvent<HTMLInputElement>) => setSearchProduct(e.target.value)}
                        />
                    </div>
                </div>
                <ul className="grid grid-cols-3 gap-[10px_10px] mt-[12px]">
                    {
                        filterProducts.length === 0 ? 
                        <div className="text-center text-[22px] col-span-full mt-[12px]">No Products Found</div> :
                        filterProducts.map((items) => {
                            return (
                                <li key={items._id} className="border rounded-[10px] max-w-[316px] p-5 flex flex-col">
                                    <h1 className="font-semibold text-gray-400">Product Name:</h1>
                                    <p className="text-center text-[18px]">{items.productName}</p>
                                    <h1 className="font-semibold text-gray-400">Product Description:</h1>
                                    <p className="text-left text-[18px] my-[3px]">{items.description}</p>
                                    <h1 className="font-semibold text-gray-400">Product Quantity:</h1>
                                    <p className={`text-center text-[18px] ${items.quantity <= 5 ? 'text-red-500' : ''}`}>{items.quantity}</p>
                                    <h1 className="font-semibold text-gray-400">Price:</h1>
                                    <p className="text-center text-[18px]">{items.price}</p>
                                    <div className="mt-auto">
                                        <button 
                                            className="w-full bg-blue-900 hover:bg-blue-800 transition-colors duration-200 text-white rounded-[10px] cursor-pointer"
                                            onClick={() => handleAddToCart(items)}
                                        >Add To Cart</button>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default Products