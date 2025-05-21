"use client"

import { decreaseCartProductQuantity, deleteCartProducts, increaseCartProductQuantity } from "@/redux/productSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"

const Cart : React.FC = () => {
    const cartItems = useSelector((store : RootState) => store.products.cartItems)
    const dispatch = useDispatch<AppDispatch>()

    const totalPriceCalculation = cartItems.reduce((acc, currentValue) => {
        return acc + currentValue.quantity * currentValue.price
    }, 0)

    console.log(cartItems)
    return (
        <>
            <div className="max-w-[750px] mx-auto">
                <h1 className="text-center text-[25px]">Cart Items</h1>
                <ul className="mt-[15px]">
                    {
                        cartItems.length > 0 ? (
                            cartItems.map((items) => {
                                return (
                                    <li key={items._id} className="p-3 rounded-[20px] not-first:mt-[10px] w-full border flex justify-between items-center gap-[10px]">
                                        <div className="w-full h-full">
                                            <h1 className="text-[19px]">Product Name</h1>
                                            <p className="text-center text-[20px]">{items.productName}</p>
                                        </div>
                                        <div className="w-full h-full">
                                            <h1 className="text-[19px]">Product price</h1>
                                            <p className="text-center text-[20px]">{items.price}$</p>
                                        </div>
                                        <div className="w-full h-full">
                                            <h1 className="text-[19px]">Quantity</h1>
                                            <div className="flex justify-center items-center gap-[12px]">
                                                <button 
                                                    className="inline-flex justify-center items-center rounded-full text-[22px] border w-[30px] h-[30px] leading-none cursor-pointer"
                                                    onClick={() => dispatch(increaseCartProductQuantity(items._id))}
                                                >+</button>
                                                <span>{items.quantity}</span>
                                                <button 
                                                    className="inline-flex justify-center items-center rounded-full text-[22px] border w-[30px] h-[30px] leading-none cursor-pointer"
                                                    onClick={() => dispatch(decreaseCartProductQuantity(items._id))}
                                                >-</button>
                                            </div>
                                        </div>
                                        <div>
                                            <button
                                                className="bg-blue-900 text-white cursor-pointer rounded-[10px] p-[2px_4px]"
                                                onClick={() => dispatch(deleteCartProducts({id : items._id}))}
                                            >Remove</button>
                                        </div>
                                    </li>
                                )
                            })
                        ) : (
                            <li className="text-center text-[20px] mt-[12px]">
                                No items
                            </li>
                        )
                    }
                </ul>

                <div className="max-w-[350px] w-full border fixed top-[80px] left-0 p-3 rounded-[10px]">
                    <h1 className="text-center text-[20px]">Cart Total</h1>
                    <ul className="flex flex-col justify-between mt-[12px]">
                        <li className="flex justify-between items-center mb-[6px]">
                            <strong className="w-full text-left">Name</strong>
                            <em className="w-full not-italic text-center">Quantity</em>
                            <span className="w-full text-right">Price</span>
                        </li>
                        {
                            cartItems.length > 0 ? (
                                cartItems.map((item) => {
                                    return (
                                        <li key={item._id} className="flex justify-between items-center">
                                            <strong className="w-full text-left">{item.productName}</strong>
                                            <em className="not-italic w-full text-center">{item.quantity}</em>
                                            <span className="w-full text-right">{item.price}$</span>
                                        </li>
                                    )
                                })
                            ) : (
                                <li className="text-[16px] text-center">No Items</li>
                            )
                        }
                    </ul>
                    <ul className="mt-[15px]">
                        <li className="flex justify-between items-center text-[18px] not-first:mt-[8px]">
                            <span>SubTotal</span>
                            100$
                        </li>
                        <li className="flex justify-between items-center text-[18px]">
                            <span>Discount</span>
                            0$
                        </li>
                        <li className="flex justify-between items-center text-[22px]">
                            <span className="text-[18px]">Total</span>
                            {totalPriceCalculation.toFixed(2)}$
                        </li>
                    </ul>
                        <button
                            className="w-full rounded-[10px] bg-blue-900 text-white cursor-pointer mt-[6px]"
                        >Checkout</button>
                </div>
            </div>
        </>
    )
}

export default Cart