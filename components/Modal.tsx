"use client"

import React, { memo } from "react"

type ShowModalProps = {
    show : boolean
    id : string
}

interface ModalProps {
    children : React.ReactNode
    closeModal : boolean
    setCloseModal : React.Dispatch<React.SetStateAction<ShowModalProps>>
}

const Modal : React.FC<ModalProps> = ({children, closeModal, setCloseModal}) => {
    if (!closeModal) {
        return null
    }
    return (
        <>
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
            <div className="border-black bg-gray-600 rounded-[10px] max-w-[500px] w-full p-5 relative">
                {children}
                <span 
                    className="border-transparent border rounded-full select-none p-2.5 text-[20px] w-[20px] h-[20px] hover:border-white inline-flex justify-center items-center cursor-pointer absolute top-[20px] right-[20px]"
                    onClick={() => setCloseModal((prev) => ({...prev, show : false}))}
                >x</span>
            </div>
        </div>
        </>
    )
}

export default memo(Modal)