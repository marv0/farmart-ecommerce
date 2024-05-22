import React from 'react'
import { format } from 'date-fns';

function formatDate(dateString) {
  return format(new Date(dateString), 'MMMM dd, yyyy HH:mm:ss');
}

export default function OrderDetailsModal({orderData, orderDetailsModalOpen, setOrderDetailsModalOpen}) {
    return (
        <div className={`${orderDetailsModalOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 items-center justify-center`}>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black opacity-50"></div>
    
          {/* Modal */}
          <section className="relative z-10">
            <div  
              className={`overflow-y-auto overflow-x-hidden fixed inset-0 
              flex items-center justify-center p-4`}
            >
              <div className="relative p-4 w-full max-w-2xl max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <div 
                        className="flex items-center justify-between p-4 md:p-5 border-b rounded-t 
                        dark:border-gray-600"
                      >
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              Order Details
                          </h3>
                          <button 
                            type="button" 
                            onClick={() => setOrderDetailsModalOpen(false)}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 
                            hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex 
                            justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" 
                            data-modal-hide="default-modal"
                          >
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                              </svg>
                              <span className="sr-only">Close modal</span>
                          </button>
                      </div>
                      <div className="p-4 md:p-5 space-y-4">
                        <p 
                          className="text-base leading-relaxed text-gray-500 
                          dark:text-gray-400"
                        >
                          <span className='font-semibold text-black pr-2'>
                            Animal Type: 
                          </span>
                          <span>
                            {orderData.animal_type}
                          </span>
                        </p>
                        <p 
                          className="text-base leading-relaxed text-gray-500 
                          dark:text-gray-400"
                        >
                          <span className='font-semibold text-black pr-2'>
                            Animal Breed: 
                          </span>
                          <span>
                            {orderData.animal_breed}
                          </span>
                        </p>
                        <p 
                          className="text-base leading-relaxed text-gray-500 
                            dark:text-gray-400"
                        >
                          <span className='font-semibold text-black pr-2'>
                              Number of Animals Ordered: 
                          </span>
                          <span>
                              {orderData.quantity}
                          </span>
                        </p>
                        <p 
                          className="text-base leading-relaxed text-gray-500 
                            dark:text-gray-400"
                        >
                          <span className='font-semibold text-black pr-2'>
                              Date Ordered: 
                          </span>
                          <span>
                              {formatDate(orderData.created_at)}
                          </span>
                        </p>
                      </div>
                      <div 
                        className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 
                        rounded-b dark:border-gray-600"
                        >
                          {/* <button 
                            data-modal-hide="default-modal" 
                            type="button" 
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                            px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                            dark:focus:ring-blue-800"
                          >
                            I accept
                          </button> */}
                          <button 
                            data-modal-hide="default-modal" 
                            type="button" 
                            onClick={() => setOrderDetailsModalOpen(false)}
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 
                            focus:outline-none bg-white rounded-lg border border-gray-200 
                            hover:bg-gray-100 hover:text-green-700 hover:border-green-500"
                          >
                            Close
                          </button>
                      </div>
                  </div>
              </div>
          </div>
        </section>
      </div>
    )
}
