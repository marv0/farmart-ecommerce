import React from 'react'
import friesianCow from '../assets/friesian.jpg'

export default function AnimalDetails() {
  return (
    <div>
        <div className="bg-gray-100 dark:bg-gray-800 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            <img 
                                className="w-full h-full object-cover" 
                                src={friesianCow}
                                alt="Product Imag" 
                            />
                        </div>
                        <div className="flex -mx-2 mb-4">

                            <div className="w-1/2 px-2">
                                <button 
                                    className="w-full bg-green-700 dark:bg-gray-600 text-white 
                                    py-2 px-4 rounded-full font-bold hover:bg-gray-800 
                                    dark:hover:bg-gray-700"
                                >
                                    Add to Cart
                                </button>
                            </div>

                            <div className="w-1/2 px-2">
                                <button 
                                    className="w-full bg-gray-200 dark:bg-gray-700 
                                    text-gray-800 dark:text-white py-2 px-4 rounded-full 
                                    font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                                >
                                    Add to Wishlist
                                </button>
                            </div>
                            
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 
                            className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
                        >
                            Animal Name
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed
                            ante justo. Integer euismod libero id mauris malesuada tincidunt.
                        </p>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span 
                                    className="font-bold text-gray-700 dark:text-gray-300"
                                >
                                    Price:
                                </span>
                                <span className="ms-1 text-gray-600 dark:text-gray-300">
                                    Ksh. 29.99
                                </span>
                            </div>
                        </div>
                        <div className="flex mb-4">
                            <div>
                                <span 
                                    className="font-bold text-gray-700 dark:text-gray-300"
                                >
                                    Availability:
                                </span>
                                <span 
                                    className="ms-2 text-gray-600 dark:text-gray-300"
                                >
                                    In Stock
                                </span>
                            </div>
                        </div>
                        {/* <div className="mb-4">
                            <span 
                                className="font-bold text-gray-700 dark:text-gray-300"
                            >
                                Select Size:
                            </span>
                            <div 
                                className="flex items-center mt-2"
                            >
                                <button 
                                    className="bg-gray-300 dark:bg-gray-700 text-gray-700 
                                    dark:text-white py-2 px-4 rounded-full font-bold mr-2 
                                    hover:bg-gray-400 dark:hover:bg-gray-600"
                                >
                                    S
                                </button>
                                <button 
                                    className="bg-gray-300 dark:bg-gray-700 text-gray-700 
                                    dark:text-white py-2 px-4 rounded-full font-bold mr-2 
                                    hover:bg-gray-400 dark:hover:bg-gray-600"
                                >
                                    M
                                </button>
                                <button 
                                    className="bg-gray-300 dark:bg-gray-700 text-gray-700 
                                    dark:text-white py-2 px-4 rounded-full font-bold mr-2 
                                    hover:bg-gray-400 dark:hover:bg-gray-600"
                                >
                                    L
                                </button>
                                <button 
                                    className="bg-gray-300 dark:bg-gray-700 text-gray-700 
                                    dark:text-white py-2 px-4 rounded-full font-bold mr-2 
                                    hover:bg-gray-400 dark:hover:bg-gray-600"
                                >
                                    XL
                                </button>
                                <button 
                                    className="bg-gray-300 dark:bg-gray-700 text-gray-700 
                                    dark:text-white py-2 px-4 rounded-full font-bold mr-2 
                                    hover:bg-gray-400 dark:hover:bg-gray-600"
                                >
                                    XXL
                                </button>
                            </div>
                        </div> */}
                        <div>
                            <span 
                                className="font-bold text-gray-700 dark:text-gray-300"
                            >
                                Animal Description:
                            </span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                                sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut
                                lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque
                                ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
                                sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
