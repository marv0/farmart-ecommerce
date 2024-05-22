import React from 'react'
import cow from '../../assets/friesian.jpg'

export default function Hero() {
  return (
    <div 
        className="bg-cover bg-no-repeat bg-center py-36 px-8" 
        style={{backgroundImage: `url(${cow})`}}
    >
        <div className="container">
            <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
                Welcome to Farmart <br/>Online Store
            </h1>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam <br/>
                accusantium perspiciatis, sapiente
                magni eos dolorum ex quos dolores odio
            </p>
            <div className="mt-12">
                <a 
                    href="/store" 
                    className="bg-green-600 text-white px-8 py-3 font-medium 
                    rounded-md hover:bg-green-700"
                >
                    Shop Now
                </a>
            </div>
        </div>
    </div>
  )
}
