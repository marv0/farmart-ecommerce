import React from 'react'
// import { IoMdAdd } from "react-icons/io";
// import { FaMinus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, removeItem, productQtyInCartSelector } from '../../store/features/CartSlice';

export default function CartItemCard({animal}) {
    const dispatch = useDispatch()
    const qty = useSelector(state=>productQtyInCartSelector(state, animal.id))

    function DeleteAnimalFromCart(){
        return(
            <button 
                type="button" 
                onClick={() => dispatch(removeItem(animal)) }
                className="bg-transparent border flex items-center justify-center w-11 h-10 
                font-semibold"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-red-500 inline cursor-pointer" viewBox="0 0 24 24">
                <path
                    d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                    data-original="#000000"></path>
                <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                    data-original="#000000"></path>
                </svg>
            </button>
        )
    }
  return (
    <div className="grid md:grid-cols-5 items-center gap-8 py-6">
        <div className="md:col-span-2 flex items-center gap-6">
            <div className="w-32 h-22 shrink-0 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] p-4">
                <img 
                    src={animal.photo} 
                    className="w-full h-full object-contain rounded-md" 
                    alt={animal.type}
                />
            </div>
            <div>
                <h3 
                    className="text-lg font-extrabold text-[#333]"
                >
                    {animal.type}
                </h3>
                <h6 
                    className="text-md text-gray-500 mt-2"
                >
                    Breed: 
                    <strong className="ml-2">
                        {animal.breed}
                    </strong>
                </h6>
            </div>
        </div>
        <div>
            <h3 
                className="text-lg font-extrabold text-[#333]"
            >
                Age
            </h3>
            <h6 
                className="text-md capitalize text-gray-500 mt-2"
            >
                <strong>
                    {animal.age} Months
                </strong>
            </h6>
        </div>

        <div>
            <h3 
                className="text-lg font-extrabold text-[#333]"
            >
                Quantity
            </h3>
            {/* Buttons starts */}
            <div className="flex overflow-hidden border w-max mt-2">
                {qty === 1 ? (
                    <DeleteAnimalFromCart />
                ) : (
                    <button 
                        type="button" 
                        onClick={() => dispatch(decrement(animal))}
                        className="bg-gray-100 flex items-center justify-center w-11 h-10 font-semibold"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current" viewBox="0 0 124 124">
                        <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                        </svg>
                    </button>
                )}
                <button 
                    type="button" 
                    className="bg-transparent flex items-center justify-center 
                    w-11 h-10 font-semibold text-gray-800 text-base"
                >
                    {qty}
                </button>
                <button 
                    type="button" 
                    onClick={() => dispatch(increment(animal))}
                    className="bg-gray-800 text-white flex items-center justify-center 
                    w-11 h-10 font-semibold"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current" viewBox="0 0 42 42">
                      <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                    </svg>
                </button>
            </div>
            {/* Buttons end  */}
            {/* <h6 
                className="text-md capitalize text-gray-500 mt-2"
            >
                <strong>
                    {animal.age} Months
                </strong>
            </h6> */}
        </div>

        <div className="flex items-center">
            <h4 
                className="text-lg font-bold text-[#333]"
            >
                Ksh. {animal.price}
            </h4>
            <button 
                onClick={() => dispatch(removeItem(animal)) }
                className="w-5 h-5 cursor-pointer shrink-0 fill-[#333] 
                hover:text-red-500 ml-auto"
            >
                <MdClose className='w-5 h-5'/>
            </button>
        </div>
    </div>
  )
}
