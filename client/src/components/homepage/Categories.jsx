import React from 'react'
import cow from '../../assets/friesian.jpg'

const categories = [
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
export default function Categories() {
  return (
    <div className="container py-16 px-4">
        <h2 
            className="text-2xl font-medium text-gray-800 uppercase mb-6 text-center"
        >
            shop by category
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mx-auto max-w-screen-lg">
            {categories?.map((category, index) => {
                return(
                    <div 
                        key={index}
                        className="relative rounded-sm overflow-hidden group"
                    >
                        <img src={cow} alt="category 1" className="w-full" />
                        <a 
                            href="/#"
                            className="absolute inset-0 bg-black bg-opacity-40 flex items-center 
                            justify-center text-xl text-white font-roboto font-medium 
                            group-hover:bg-opacity-60 transition"
                        >
                            Bedroom
                        </a>
                    </div>
                )
            })}
        </div>
    </div>
  )
}
