import { getAllData } from "@/createAsyncthunk/createAsyncthunk"
import { AppDispatch, RootState } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const DashboardHome = () => {
    const {products, loading} = useSelector((store : RootState) => store.products)
    const dispatch = useDispatch<AppDispatch>()
    console.log(products)

    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])

    const totalRevenue = products.reduce((acc, product) => {
        return acc + product.quantity * product.price
    }, 0)

    if (loading) {
        return <div className="text-[24px] text-center max-w-[500px] mx-auto">Loading...</div>
    }

    return (
        <>
            <div>
                <div className="flex items-center gap-[10px]">
                    <div className="p-5 border rounded-[10px] w-full">
                        <h1 className="text-[20px] font-semibold">Weekly Balance</h1>
                        <p className="text-[18px] mt-[10px]">{totalRevenue.toFixed(2)}$</p>
                    </div>
                    <div className="p-5 border rounded-[10px] w-full">
                        <h1 className="text-[20px] font-semibold">Total Products</h1>
                        <p className="text-[18px] mt-[10px]">{products.length}</p>
                    </div>
                    <div className="p-5 border rounded-[10px] w-full">
                        <h1 className="text-[20px] font-semibold">Low Stock Products</h1>
                        <p className="text-[18px] mt-[10px]">
                            {
                                products.filter((item) => item.quantity <= 5).length
                            }
                        </p>
                    </div>
                    <div className="p-5 border rounded-[10px] w-full">
                        <h1 className="text-[20px] font-semibold">Out of Stock Products</h1>
                        <p className="text-[18px] mt-[10px]">
                            {
                                products.filter((item) => item.quantity === 0).length
                            }
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardHome