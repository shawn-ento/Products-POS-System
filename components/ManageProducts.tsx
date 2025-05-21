import { deleteData, getAllData, updateData } from "@/createAsyncthunk/createAsyncthunk"
import { deleteProduct, updateProduct } from "@/redux/productSlice"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Modal from "./Modal"
import { createPortal } from "react-dom"

interface EditProductTypes {
    id : string
    productName : string
    price : string
    description : string
    quantity : string
}

interface ItemsProps {
    _id : string
    productName : string
    description : string
    quantity : number
    price : number
}

type ShowModalProps = {
    show : boolean
    id : string
}

const ManageProducts : React.FC = () => {
    const {products, loading} = useSelector((store : RootState) => store.products)
    const dispatch = useDispatch<AppDispatch>()
    const [editProduct, setEditProduct] = useState<EditProductTypes>({
        id : '',
        productName : '',
        price : '',
        description : '',
        quantity : ''
    })
    const [showDeleteModal, setShowDeleteModal] = useState<ShowModalProps>({
        show : false,
        id : ''
    })
    const [searchTerms, setsearchTerms] = useState<string>('')

    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])

    const filterProducts = products.filter((item) => {
        return item.productName.trim().toLowerCase().includes(searchTerms.trim().toLowerCase())
    })

    const handleEditProduct = (item : ItemsProps) => {
        setEditProduct((prev) => {
            return {
                ...prev, 
                id : item._id, 
                productName : item.productName,
                description : item.description,
                quantity : item.quantity.toString(),
                price : item.price.toString()
            }
        })
    }

    const handleEditProductInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        if (name === 'newQuantity' || name === 'newPrice') {
            setEditProduct((prev) => {
                return {
                    ...prev, [name] : /^\d+$/.test(value) ? value : ''
                }
            })
        }
        else {
            setEditProduct((prev) => {
                return {
                    ...prev, [name] : value
                }
            })
        }
    }

    const handleSaveProduct = () => {      
        const updatedProduct = {
            ...editProduct,
            price: Number(editProduct.price),
            quantity: Number(editProduct.quantity)
        };
        dispatch(updateProduct(updatedProduct))
        dispatch(updateData(updatedProduct))
        setEditProduct((prev) => ({...prev, id : ''}))
    }

    if (loading) {
        return <div className="text-[22px] text-center max-w-[1000px] mx-auto">Loading...</div>
    }
    return (
        <>
            <div className="max-w-[1200px] mx-auto">
                <div className="mb-[12px]">
                    <h1 className="text-[22px] text-center">--- Manage Products ---</h1>
                    <div className="flex justify-end">
                        <input 
                            type="text"
                            className="outline-none border w-full rounded-[10px] p-[3px_15px] text-[18px] max-w-[350px] inline-block"
                            placeholder="Search Products..."
                            value={searchTerms}
                            onChange={(e : React.ChangeEvent<HTMLInputElement>) => setsearchTerms(e.target.value)}
                        />
                    </div>
                </div>
                <table className="w-full border border-collapse">
                    <thead>
                        <tr className="[&>th]:border [&>th]:p-[4px_8px]">
                            <th className="w-[25%]"><h1>Product Name</h1></th>
                            <th className="w-[40%]"><h1>Description</h1></th>
                            <th className="w-[10%]"><h1>Quantity</h1></th>
                            <th className="w-[10%]"><h1>Price</h1></th>
                            <th className="w-[15%]"><h1>Actions</h1></th>
                        </tr>
                    </thead>
                    <tbody>
                        {   filterProducts.length > 0 ? (
                                filterProducts.map((items) => {
                                    return (
                                        <tr key={items._id} className="[&>td]:border [&>td]:p-4 ">
                                            <td>
                                                <div>
                                                    {
                                                        editProduct.id === items._id ? (
                                                            <input
                                                                type="text"
                                                                className="p-[3px_10px] rounded-[10px] border outline-none"
                                                                value={editProduct.productName}
                                                                onChange={handleEditProductInput}
                                                                name="productName"
                                                            />
                                                        ) : (
                                                            <h1 className="font-semibold text-[17px]">{items.productName}</h1>
                                                        )
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    {
                                                        editProduct.id === items._id ? (
                                                            <input
                                                                type="text"
                                                                className="p-[3px_10px] rounded-[10px] border outline-none"
                                                                value={editProduct.description}
                                                                onChange={handleEditProductInput}
                                                                name="description"
                                                            />
                                                        ) : (
                                                            <p className="text-[17px]">{items.description}</p>
                                                        )
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex justify-center items-center">
                                                    {
                                                        editProduct.id === items._id ? (
                                                            <input
                                                                type="text"
                                                                className="p-[3px_10px] rounded-[10px] border outline-none"
                                                                value={editProduct.quantity}
                                                                onChange={handleEditProductInput}
                                                                name="quantity"
                                                            />
                                                        ) : (
                                                            <span className="text-[18px]">{items.quantity}</span>
                                                        )
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex justify-center items-center">
                                                    {
                                                        editProduct.id === items._id ? (
                                                            <input
                                                                type="text"
                                                                className="p-[3px_10px] rounded-[10px] border outline-none"
                                                                value={editProduct.price}
                                                                onChange={handleEditProductInput}
                                                                name="price"
                                                            />
                                                        ) : (
                                                            <span className="text-[18px]">{items.price}</span>
                                                        )
                                                    }
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center gap-[6px] justify-center">
                                                    <button
                                                        className="bg-blue-800 rounded-[10px] p-[2px_10px] text-[17px] cursor-pointer"
                                                        onClick={() => editProduct.id === items._id ? handleSaveProduct() : handleEditProduct(items)}
                                                    >{editProduct.id === items._id ? 'Save' : 'Edit'}</button>
                                                    <button
                                                        className="bg-red-800 rounded-[10px] p-[2px_10px] text-[17px] cursor-pointer"
                                                        onClick={() => setShowDeleteModal((prev) => ({...prev, id : items._id, show : true}))}
                                                    >Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan={5}>
                                        <span className="w-full text-[18px] text-center inline-block my-[5px]">No Product Found</span>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                {
                createPortal(
                    showDeleteModal.show && (
                        <Modal closeModal={showDeleteModal.show} setCloseModal={setShowDeleteModal}>
                            <p className="text-[20px]">Delete This Product?</p>
                            <div className="flex items-center gap-[8px] mt-[12px]">
                                <button
                                    className="p-[4px_12px] rounded-[10px] bg-blue-900 dark:text-white text-black cursor-pointer"
                                    onClick={() => setShowDeleteModal((prev) => ({...prev, show : false}))}
                                >Cancel</button>
                                <button
                                    className="p-[4px_12px] rounded-[10px] bg-red-800 dark:text-white text-black cursor-pointer"
                                    onClick={() => {
                                        dispatch(deleteData(showDeleteModal.id))
                                        setShowDeleteModal((prev) => ({...prev, show : false}))
                                        dispatch(deleteProduct({id : showDeleteModal.id}))
                                    }}
                                >Delete</button>
                            </div>
                        </Modal>
                    ),
                    document.body
                )
                }
            </div>
        </>
    )
}

export default ManageProducts