import React from 'react'

export default function CancelOrderModal({cancelOrderModalOpen, setCancelOrderModalOpen, orderToCancel, cancelOrderConfirmed}) {
    return (
        <div className={`${cancelOrderModalOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 items-center justify-center`}>
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
                              Cancel Order
                          </h3>
                          <button 
                            type="button" 
                            onClick={() => setCancelOrderModalOpen(false)}
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
                        <h3 
                            className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"
                        >
                            Are you sure you want to cancel this order?
                        </h3>
                        <section className='flex items-center justify-center'>
                          <button 
                              onClick={() => cancelOrderConfirmed(orderToCancel.id)}
                              className="text-white bg-red-600 hover:bg-red-800 
                              font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 
                              text-center"
                          >
                              Yes, I'm sure
                          </button>
                          <button 
                              onClick={() => setCancelOrderModalOpen(false)} 
                              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 
                              focus:outline-none bg-white rounded-lg border border-gray-200 
                              hover:bg-gray-100 hover:text-blue-700"
                          >
                              No, cancel
                          </button>
                        </section>
                      </div>
                  </div>
              </div>
          </div>
        </section>
      </div>
    )
}
