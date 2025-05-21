import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface EditDetails {
    id : string 
    productName : string
    price : number
    description : string
    quantity : number
}

const apiInstance = axios.create({
    baseURL : `http://localhost:3000/api`
})

export const getAllData = createAsyncThunk('pos/GetAllData', async () => {
    try {
        const response = await apiInstance.get('/products')
        return response.data.products
    }
    catch (error) {
        console.log(error)
    }
})

export const postData = createAsyncThunk('pos/PostData', async (postData : {productName : string, quantity : number, price : number, description : string}) => {
    try {
        const response = await apiInstance.post('/products', postData)
        return await response.data
    }
    catch(error) {
        console.log(error)
    }
})

export const updateData = createAsyncThunk('pos/UpdateData', async (editDetails : EditDetails) => {
    try {
        const response = await apiInstance.put(`/products/${editDetails.id}`, {
            newProductName : editDetails.productName,
            newPrice : editDetails.price,
            newDescription : editDetails.description,
            newQuantity : editDetails.quantity
        })
        return await response.data
    }
    catch(error) {
        console.error(error)
    }
})

export const deleteData = createAsyncThunk('pos/DeleteData', async (id : string) => {
    try {
        const response = await apiInstance.delete(`/products/${id}`)
        return await response.data
    }
    catch (error) {
        console.error(error)
    }
})
