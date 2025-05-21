import dataBase from "@/libs/dataBase";
import product from "@/models/productSchema";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request : NextRequest, {params} : {params : Promise<{id : string}>}) => {
    const {id} = await  params
    const {newProductName : productName, newDescription : description, newQuantity : quantity, newPrice : price} = await request.json()
    await dataBase()
    await product.findByIdAndUpdate(id, {productName, description, quantity, price})
    return NextResponse.json({message : 'Topic Updated'}, {status : 201})
}

export const GET = async (request : NextRequest, {params} : {params : Promise<{id : string}>}) => {
        const {id} = await params
        await dataBase()
        const singleProduct = await product.findById(id)
        return NextResponse.json(singleProduct, {status : 201})
}

export const DELETE = async (request : NextRequest, {params} : {params : Promise<{id : string}>}) => {
        const {id} = await params
        await dataBase()
        await product.findByIdAndDelete(id)
        return NextResponse.json({message : 'product deleted successfully'}, {status : 201})
}