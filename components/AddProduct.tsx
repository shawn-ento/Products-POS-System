"use client"

import { postData } from "@/createAsyncthunk/createAsyncthunk"
import { AppDispatch } from "@/redux/store"
import { useState } from "react"
import { useDispatch } from "react-redux"

interface ProductTypes {
    productName : string
    description : string
    quantity : string
    price : string
}

const AddProduct = () => {
    const [productDetail, setProductDetail] = useState<ProductTypes>({
        productName : '',
        description : '',
        quantity : '',
        price : ''
    })
    const dispatch = useDispatch<AppDispatch>()

    const handleProductInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target

        if (name === 'quantity' || name === 'price') {
            setProductDetail((prev) => {
                return {
                    ...prev, [name] : /^\d+$/.test(value) ? value : ''
                }
            })
        }
        else {
            setProductDetail((prev) => {
            return {
                ...prev, [name] : value
            }
            })
        }
    }

    const handleProductData = () => {
        if (productDetail.productName === '' || productDetail.description === '' || productDetail.quantity === '' || productDetail.price === '' ) {
            return
        }
        const postProductDetails = {
            productName : productDetail.productName,
            description : productDetail.description,
            quantity : Number(productDetail.quantity),
            price : Number(productDetail.price)
        }
        dispatch(postData(postProductDetails))
        setProductDetail({
            productName : '',
            price : '',
            quantity : '',
            description : ''
        })
    }
    return (
        <>
            <div className="max-w-[800px] border p-5 rounded-[10px] mx-auto [&>label]:text-[17px] [&>label]:mt-[6px] [&>label]:inline-block">
                <h1 className="text-[20px] text-center">--- Add Product ---</h1>
                <label htmlFor="">Product Name</label>
                <input 
                    type="text" 
                    className="border outline-none p-[5px_15px] rounded-[10px] w-full text-[18px]"
                    placeholder="Product Name"
                    value={productDetail.productName}
                    name="productName"
                    onChange={handleProductInput}
                />
                <label htmlFor="">Product Description</label>
                <input 
                    type="text" 
                    className="border outline-none p-[5px_15px] rounded-[10px] w-full text-[18px]"
                    placeholder="Product Description"
                    value={productDetail.description}
                    name="description"
                    onChange={handleProductInput}
                />
                <label htmlFor="">Product price</label>
                <input 
                    type="text" 
                    className="border outline-none p-[5px_15px] rounded-[10px] w-full text-[18px]"
                    placeholder="Product price"
                    value={productDetail.price}
                    name="price"
                    onChange={handleProductInput}
                />
                <label htmlFor="">Product Quantity</label>
                <input 
                    type="text" 
                    className="border outline-none p-[5px_15px] rounded-[10px] w-full text-[18px]"
                    placeholder="Product Quantity"
                    value={productDetail.quantity}
                    name="quantity"
                    onChange={handleProductInput}
                />
                <div>
                    <button
                        className="bg-blue-900 text-white rounded-[10px] p-[5px_12px] cursor-pointer mt-[8px]"
                        onClick={handleProductData}
                    >Add Product</button>
                </div>
            </div>
        </>
    )
} 

export default AddProduct