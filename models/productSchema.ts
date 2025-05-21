import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    productName : {
        type : String
    },
    price : {
        type : Number
    },
    quantity : {
        type : Number
    },
    description : {
        type : String
    }
})

const product = mongoose.models.product_List || mongoose.model('product_List', productSchema)

export default product
