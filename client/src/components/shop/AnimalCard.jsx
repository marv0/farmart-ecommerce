import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, productQtyInCartSelector } from '../../store/features/CartSlice'

export default function AnimalCard({animal}) {
    const qty = useSelector(state=>productQtyInCartSelector(state, animal.id))
    const dispatch = useDispatch()

    function AddToCart(){
        if(!qty){
            return(
                <button 
                    onClick={() => dispatch(increment(animal))}
                    className="text-white bg-green-600 hover:bg-green-700 
                    font-medium rounded-lg text-sm px-5 py-2 text-center"
                >
                    Add to cart
                </button>
            )
        }
        return(
            <button 
                onClick={() => dispatch(decrement(animal))}
                className="text-white bg-green-600 hover:bg-green-700 
                font-medium rounded-lg text-sm px-5 py-2 text-center"
            >
                Remove from cart
            </button>
        )
    }
  return (
    <div 
        className="relative flex flex-col overflow-hidden rounded-lg 
        border shadow"
    >
        <div className="aspect-square overflow-hidden">
            <a href={`/animal/${animal.id}`}>
                <img 
                    className="h-full w-full object-cover transition-all duration-300 
                    group-hover:scale-125" 
                    src={animal.photo} 
                    alt="" 
                />
            </a>
        </div>
        <div className="my-4 mx-auto flex w-11/12 flex-col items-start justify-between">
            <a 
                href={`/animal/${animal.id}`}
                className='text-xl font-bold tracking-tight text-gray-900'
            >
                <h3 
                    // className="mb-2 text-sm text-gray-400"
                >
                    {animal.type}
                </h3>
            </a>
        </div>
        <div className="mb-2 flex w-11/12 mx-auto items-start justify-between">
            <span 
                className="text-xl font-bold text-gray-900 dark:text-white"
            >
                <span>Ksh.</span>
                <span className='ps-1'>
                    {animal.price}
                </span>
            </span>
            <AddToCart />
        </div>
    </div>
  )
}
