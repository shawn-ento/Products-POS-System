"use client"
import { getAllData } from "@/createAsyncthunk/createAsyncthunk";
import { getLocalStorageData } from "@/utils/storeData";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductTypes {
        _id : string
        productName : string
        description : string
        quantity : number 
        price : number
}

interface CartTypes {
    _id : string
    quantity : number
    price : number
    productName : string
}

interface ProductState {
    products : ProductTypes[]
    cartItems : CartTypes[] 
    sellItems : ProductTypes[]
    soldItems : CartTypes[]
    loading : boolean
}

interface EditProductTypes {
    id : string 
    productName : string
    price : number
    description : string
    quantity : number
}

const initialState : ProductState = {
    products : [],
    cartItems : typeof window !== 'undefined' ? getLocalStorageData('cartItems') : [],
    sellItems : typeof window !== 'undefined' ? getLocalStorageData('sellItems') : [],
    soldItems : [],
    loading : false
}

const productSlice = createSlice({
    name : 'productPOS',
    initialState,
    reducers : {
        addCartProduct : (state, action : PayloadAction<Omit<CartTypes, 'quantity'>>) => {
            const isProductContains = state.cartItems.some((item) => {
                return item._id === action.payload._id
            })
            if (!isProductContains) {
                state.cartItems.push({...action.payload, quantity : 1})
                if (typeof window !== "undefined") {
                    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
                }
            }
        },
        updateProduct : (state, action : PayloadAction<EditProductTypes>) => {
            state.products = state.products.map((items) => {
               return items._id === action.payload.id ? 
               {...items, 
                productName : action.payload.productName, 
                description : action.payload.description, 
                price : action.payload.price, 
                quantity : action.payload.quantity}
                : items
            })
        },
        deleteProduct : (state, action : PayloadAction<{id : string}>) => {
            state.products = state.products.filter((items) => {
                return items._id !== action.payload.id 
            })
        },
        deleteCartProducts : (state, action : PayloadAction<{id : string}>) => {
            const filterCartProducts = state.cartItems.filter((items) => {
                return items._id !== action.payload.id
            })
            state.cartItems = filterCartProducts
            if (typeof window !== 'undefined') {
                localStorage.setItem('cartItems', JSON.stringify(filterCartProducts))
            }
        },
        increaseCartProductQuantity : (state, action : PayloadAction<string>) => {
            const existingItem = state.cartItems.find((item) => {
                return item._id === action.payload
            })
            if (existingItem) {
                existingItem.quantity += 1
            }
        },
        decreaseCartProductQuantity : (state, action : PayloadAction<string>) => {
            const existingItem = state.cartItems.find((item) => (
                item._id === action.payload
            ))
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1
            }
        },
        increaseSellQuantity : (state, action : PayloadAction<string>) => {
            const existingItem = state.sellItems.find((item) => item._id === action.payload)
            const productsItem = state.products.find((item) => item._id === action.payload)

            if (existingItem && productsItem && existingItem.quantity < productsItem?.quantity) {
                existingItem.quantity += 1
            }
        },
        decreaseSellQuantity : (state, action : PayloadAction<string>) => {
            const existingItem = state.sellItems.find((item) => item._id === action.payload)
            if (existingItem && existingItem.quantity > 0) {
                existingItem.quantity -= 1
            }
        },
        addSellProducts : (state, action: PayloadAction<Omit<ProductTypes, 'quantity'>>) => {
            const isProductContains = state.sellItems.some((item) => item._id === action.payload._id)
            if (!isProductContains) {
                state.sellItems.push({...action.payload, quantity : 1})
            }
            localStorage.setItem('sellItems', JSON.stringify(state.sellItems))
        },
        deleteSellProducts : (state, action : PayloadAction<string>) => {
            const removeSellProducts = state.sellItems.filter((item) => {
                return item._id !== action.payload 
            })
            state.sellItems = removeSellProducts
            localStorage.setItem('sellItems', JSON.stringify(removeSellProducts))
        }
    },
    extraReducers : (builder) => {
        builder
        .addCase(getAllData.pending, (state) => {
            state.loading = true
        })
        .addCase(getAllData.fulfilled, (state, action) => {
            state.products = action.payload
            state.loading = false
        })
        .addCase(getAllData.rejected, (state) => {
            state.loading = false
        })
    }
})

export const {
        addCartProduct, 
        updateProduct, 
        deleteProduct, 
        deleteCartProducts,
        increaseCartProductQuantity,
        decreaseCartProductQuantity,
        increaseSellQuantity,
        decreaseSellQuantity,
        addSellProducts,
        deleteSellProducts
    } = productSlice.actions
export default productSlice.reducer
