import React from 'react'
import CartItemCard from '../components/cart/CartItemCard'

export default function Cart() {
  return (
    <div className="font-[sans-serif]">
        <div className="grid lg:grid-cols-3 gap-12 p-6">
            <div className="lg:col-span-2 bg-white divide-y">
                <CartItemCard />
                <CartItemCard />
            </div>
            <div className="bg-gray-100 rounded p-6">
                <h3 className="text-xl font-extrabold text-[#333] border-b pb-4">Order Summary</h3>
                <ul className="text-[#333] divide-y mt-6">
                    <li className="flex flex-wrap gap-4 text-md py-4">Subtotal <span className="ml-auto font-bold">$46.00</span></li>
                    <li className="flex flex-wrap gap-4 text-md py-4">Shipping <span className="ml-auto font-bold">$4.00</span></li>
                    <li className="flex flex-wrap gap-4 text-md py-4">Tax <span className="ml-auto font-bold">$4.00</span></li>
                    <li className="flex flex-wrap gap-4 text-md py-4 font-bold">Total <span className="ml-auto">$54.00</span></li>
                </ul>
                <button 
                    type="button" 
                    className="mt-6 text-md px-6 py-2.5 w-full bg-blue-600 
                    hover:bg-blue-700 text-white rounded"
                >
                    Check Out
                </button>
            </div>
        </div>
    </div>
  )
}
