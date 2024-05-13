import React from 'react'
// import { IoMdAdd } from "react-icons/io";
// import { FaMinus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { useDispatch } from 'react-redux'
import { removeItem } from '../../store/features/CartSlice';

export default function CartItemCard({animal}) {
    const dispatch = useDispatch()
  return (
    <div className="grid md:grid-cols-4 items-center gap-8 py-6">
        <div className="md:col-span-2 flex items-center gap-6">
            <div className="w-32 h-22 shrink-0 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] p-4">
                <img 
                    src={animal.photo} 
                    className="w-full h-full object-contain rounded-md" 
                    alt='Cart Animal'
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
                    {animal.age}
                </strong>
            </h6>
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
