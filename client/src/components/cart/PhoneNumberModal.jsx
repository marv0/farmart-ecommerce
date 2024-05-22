import React, {useState} from 'react'

export default function PhoneNumberModal({modalOpen, setModalOpen, handleFormNumberSubmitted}) {
    const [mpesaNumber, setMpesaNumber] = useState('')

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleFormNumberSubmitted(mpesaNumber)
        setModalOpen(false)
        setMpesaNumber('')
    }
    return (
        <div className={`${modalOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 items-center justify-center`}>
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
                            Place Your Order
                          </h3>
                          <button 
                            type="button" 
                            onClick={() => setModalOpen(false)}
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
                      {/* Modal Body */}
                      <div className="p-4 md:p-5">
                        <form className="space-y-4" onSubmit={handleFormSubmit}>
                            <div>
                                <label 
                                    htmlFor="phoneNumber" 
                                    className="block mb-2 text-sm font-medium text-gray-900 
                                    dark:text-white"
                                >
                                    Your Mpesa Phone Number
                                </label>
                                <input 
                                    type="tel" 
                                    name="phoneNumber" 
                                    id="phoneNumber" 
                                    value={mpesaNumber}
                                    onChange={(e) => setMpesaNumber(e.target.value)}
                                    placeholder="0722000000" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 
                                    text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                                    block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 
                                    dark:placeholder-gray-400 dark:text-white" 
                                    required 
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="w-full text-white bg-green-500 hover:bg-green-600 
                                font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Proceed to pay
                            </button>
                        </form>
                        </div>
                      {/* Modal Body */}
                      {/* <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                          <button 
                            data-modal-hide="default-modal" 
                            type="button" 
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                            px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                            dark:focus:ring-blue-800"
                          >
                            I accept
                          </button>
                          <button 
                            data-modal-hide="default-modal" 
                            type="button" 
                            onClick={() => setModalOpen(false)}
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 
                            focus:outline-none bg-white rounded-lg border border-gray-200 
                            hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 
                            focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 
                            dark:text-gray-400 dark:border-gray-600 dark:hover:text-white 
                            dark:hover:bg-gray-700"
                          >
                            Decline
                          </button>
                      </div> */}
                  </div>
              </div>
          </div>
        </section>
      </div>
    )
}
