import dataBase from "@/libs/dataBase"
import product from "@/models/productSchema"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request : NextRequest) => {
    const {productName, price, quantity, description} = await request.json()
    await dataBase()
    product.create({productName, price, quantity, description})
    return NextResponse.json({message : 'product created'}, {status : 201})
}

export const GET = async () => {
    await dataBase()
    const products = await product.find()
    return NextResponse.json({"products" : products}, {status : 201})
}