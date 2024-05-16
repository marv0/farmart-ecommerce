import React, {useState} from 'react'
import { useSelector} from 'react-redux' 
import { totalPriceSelector, totalCartItemsSelector } from '../store/features/CartSlice'
import CartItemCard from '../components/cart/CartItemCard'
import EmptyCart from '../components/cart/EmptyCart'
import PhoneNumberModal from '../components/cart/PhoneNumberModal'

export default function Cart() {
    const totalItems = useSelector(totalCartItemsSelector)
    const cartItems = useSelector((state)=> state.cart.cartItems);
    const totalPrice = useSelector(totalPriceSelector)
    const [modalOpen, setModalOpen] = useState(false)

    const handleFormNumberSubmitted = (mpesaNumber) => {
        console.log(mpesaNumber)
    }

    if(totalItems === 0){
        return(
            <div className='bg-gray-300 min-h-screen'>
                <EmptyCart />
            </div>
        )
    }
  return (
    <div className="font-[sans-serif]">
        <div className="grid lg:grid-cols-3 gap-12 p-6">
            <div className="lg:col-span-2 bg-white divide-y">
                {cartItems?.map((animal, index) => {
                    return(
                        <CartItemCard 
                            key={index}
                            animal={animal.animal}
                        />
                    )
                })}
            </div>
            <div className="lg:col-span-1 bg-gray-100 rounded p-6">
                <h3 
                    className="text-xl font-extrabold text-[#333] border-b pb-4"
                >
                    Order Summary
                </h3>
                <ul className="text-[#333] divide-y mt-6">
                    <li 
                        className="flex flex-wrap gap-4 text-md py-4"
                    >
                        Number of Animals 
                        <span className="ml-auto font-bold">
                            {totalItems}
                        </span>
                    </li>
                    <li 
                        className="flex flex-wrap gap-4 text-md py-4"
                    >
                        Subtotal 
                        <span className="ml-auto font-bold">
                            Ksh. {totalPrice}
                        </span>
                    </li>
                    {/* <li 
                        className="flex flex-wrap gap-4 text-md py-4"
                    >
                        Tax 
                        <span className="ml-auto font-bold">
                            Ksh. 4.00
                        </span>
                    </li> */}
                    <li 
                        className="flex flex-wrap gap-4 text-md py-4 font-bold"
                    >
                        Total Cost
                        <span className="ml-auto">
                            Ksh. {totalPrice}
                        </span>
                    </li>
                </ul>
                <button 
                    type="button" 
                    onClick={() => setModalOpen(true)}
                    className="mt-6 text-md px-6 py-2.5 w-full bg-blue-600 
                    hover:bg-blue-700 text-white rounded"
                >
                    Check Out
                </button>
            </div>
            <PhoneNumberModal
                modalOpen={modalOpen} 
                setModalOpen={setModalOpen}
                handleFormNumberSubmitted={handleFormNumberSubmitted}
            />
        </div>
    </div>
  )
}
