import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function PhoneNumberModal({ modalOpen, setModalOpen, handleFormNumberSubmitted, amount }) {
    const [mpesaNumber, setMpesaNumber] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await handleFormNumberSubmitted(mpesaNumber, amount);
        } catch (error) {
            console.error('Error processing payment:', error);
        }
        setModalOpen(false);
        setMpesaNumber('');
    };

    return (
        <div className={`${modalOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 items-center justify-center`}>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black opacity-50"></div>

            {/* Modal */}
            <section className="relative z-10">
                <div className={`overflow-y-auto overflow-x-hidden fixed inset-0 flex items-center justify-center p-4`}>
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
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
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
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
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
                                    <div>
                                        <label
                                            htmlFor="amount"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Amount
                                        </label>
                                        <input
                                            type="text"
                                            name="amount"
                                            id="amount"
                                            value={`Ksh. ${amount}`}
                                            readOnly
                                            className="bg-gray-50 border border-gray-300 text-gray-900 
                                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                                            block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 
                                            dark:placeholder-gray-400 dark:text-white"
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
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

PhoneNumberModal.propTypes = {
    modalOpen: PropTypes.bool.isRequired,
    setModalOpen: PropTypes.func.isRequired,
    handleFormNumberSubmitted: PropTypes.func.isRequired,
    amount: PropTypes.number.isRequired,
};
