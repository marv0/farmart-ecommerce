import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";

export default function CartItemCard() {
  return (
    <div className="grid md:grid-cols-4 items-center gap-8 py-6">
        <div className="md:col-span-2 flex items-center gap-6">
            <div className="w-32 h-22 shrink-0 shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)] p-4">
                <img 
                    src='https://readymadeui.com/images/product11.webp' 
                    className="w-full h-full object-contain rounded-md" 
                    alt=''
                />
            </div>
            <div>
                <h3 className="text-lg font-extrabold text-[#333]">VelvetGlide Boots</h3>
                <h6 className="text-md text-gray-500 mt-2">Color: <strong className="ml-2">Black</strong></h6>
            </div>
        </div>
        <div className="flex">
            <button type="button" className="bg-transparent py-2 font-semibold text-[#333]">
                <FaMinus className="w-5 h-5 fill-current font-semibold" />
            </button>
            <button type="button" className="bg-transparent mx-4 px-4 py-2 font-semibold text-[#333] text-md shadow-[0_0px_4px_0px_rgba(6,81,237,0.2)]">
                1
            </button>
            <button type="button" className="bg-transparent py-2 font-semibold text-[#333]">
                <IoMdAdd className="w-5 h-5 fill-current font-semibold"/>
            </button>
        </div>
        <div className="flex items-center">
            <h4 className="text-lg font-bold text-[#333]">$20.00</h4>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 cursor-pointer shrink-0 fill-[#333] hover:fill-red-500 ml-auto" viewBox="0 0 320.591 320.591">
                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000"></path>
                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000"></path>
            </svg>
        </div>
    </div>
  )
}
