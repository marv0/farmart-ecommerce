import React from 'react'
import cow from '../../assets/friesian.jpg'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, productQtyInCartSelector } from '../../store/features/CartSlice'

const newarrivals = [
    {
        id:1
    },
    {
        id:1
    },
    {
        id:1
    },
    {
        id:1
    },
    {
        id:1
    },
]
export default function NewArrivals() {
    function AddToCart({animal}){
        const qty = useSelector(state=>productQtyInCartSelector(state, animal.id))
        const dispatch = useDispatch()

        if(!qty){
            return(
                <button 
                    onClick={() => dispatch(increment(animal))}
                    className="block w-full py-1 text-center text-white bg-green-600 border 
                    border-primary rounded-b hover:bg-green-700 transition"
                >
                    Add to cart
                </button>
            )
        }
        return(
            <button 
                onClick={() => dispatch(decrement(animal))}
                className="block w-full py-1 text-center text-white bg-green-600 border 
                border-primary rounded-b hover:bg-green-700 transition"
            >
                Remove cart
            </button>
        )
    }
  return (
    <div className="container pb-16 px-4">
        <h2 
            className="text-2xl font-medium text-gray-800 capitalize mb-6 pl-28"
        >
            Newly Listed Animals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mx-auto max-w-screen-lg">
            {newarrivals?.map((animal, index) => {
                return(
                    <div 
                        key={index}
                        className="bg-white shadow rounded overflow-hidden group"
                    >
                        <div className="relative">
                            <img 
                                src={cow} 
                                alt="product 1" 
                                className="w-full" 
                            />
                            <div 
                                className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                                justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
                            >
                                <a href="/#"
                                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                    title="view product">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </a>
                                <a href="/#"
                                    className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
                                    title="add to wishlist">
                                    <i className="fa-solid fa-heart"></i>
                                </a>
                            </div>
                        </div>
                        <div className="pt-4 pb-3 px-4">
                            <a href="/#">
                                <h4 
                                    className="uppercase font-medium text-xl mb-2 text-gray-800 
                                    hover:text-primary transition"
                                >
                                    Guyer Chair
                                </h4>
                            </a>
                            <div className="flex items-baseline mb-1 space-x-2">
                                <p className="text-xl text-primary font-semibold">Ksh. 45.00</p>
                                {/* <p className="text-sm text-gray-400 line-through">$55.90</p> */}
                            </div>
                            {/* <div className="flex items-center">
                                <div className="flex gap-1 text-sm text-yellow-400">
                                    <span><i className="fa-solid fa-star"></i></span>
                                    <span><i className="fa-solid fa-star"></i></span>
                                    <span><i className="fa-solid fa-star"></i></span>
                                    <span><i className="fa-solid fa-star"></i></span>
                                    <span><i className="fa-solid fa-star"></i></span>
                                </div>
                                <div className="text-xs text-gray-500 ml-3">(150)</div>
                            </div> */}
                        </div>
                        <AddToCart animal={animal} />
                    </div>
                )
            })}
        </div>
    </div>
  )
}
