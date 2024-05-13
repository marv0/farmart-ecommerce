import React from 'react'
import shoppingCart from '../../assets/shoppingCart.jpg'

export default function EmptyCart() {
  return (
    <section className='pt-20'>
        <div className='flex items-center justify-center'>
            <div className='flex flex-col items-center'>
                <div className='mb-2'>
                    <img 
                        src={shoppingCart} 
                        alt='Shopping Cart'
                    />
                </div>
                <div className='mb-2'>
                    <span className='text-md font-semibold'>
                        Your cart is empty!
                    </span>
                </div>
                <div className='mb-6'>
                    <span className='font-light text-sm'>
                        Browse our store and discover our best listings!
                    </span>
                </div>
                <div>
                    <a 
                        href={`/store`}
                        className={`px-4 py-2 text-center text-white font-semibold 
                        rounded-sm shadow-md bg-green-500 hover:bg-green-700`}
                    >
                        Our Store
                    </a>
                </div>
            </div>
        </div>
    </section>
  )
}
