import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function AnimalDetailsModal({animalData, deleteAnimal, animalDetailsModalOpen, setAnimalDetailsModalOpen}) {
  const navigate = useNavigate();

  const routeToEditAnimal = (animal) => {
    setAnimalDetailsModalOpen(false)
    navigate(`/farmer/animal/${animal.id}/edit`, {state:{animal}})
  }
  return (
    <div className={`${animalDetailsModalOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 items-center justify-center`}>
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
                          Animal Details
                      </h3>
                      <button 
                        type="button" 
                        onClick={() => setAnimalDetailsModalOpen(false)}
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
                  {animalData && 
                    <div className="p-4 md:p-5 space-y-4">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          <span className='font-semibold text-black pr-2'>
                            Type:
                          </span>{animalData.type}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          <span className='font-semibold text-black pr-2'>
                            Breed:
                          </span>{animalData.breed}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          <span className='font-semibold text-black pr-2'>
                            Age:
                          </span>{animalData.age} Months
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          <span className='font-semibold text-black pr-2'>
                            Price:
                          </span>Ksh. {animalData.price}
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          <span className='font-semibold text-black pr-2'>
                            Description:
                          </span>{animalData.description}
                        </p>
                    </div>
                  }
                  <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        onClick={() => deleteAnimal(animalData.id)} 
                        data-modal-hide="default-modal" 
                        type="button" 
                        className="text-white bg-red-600 hover:bg-red-700 
                        font-medium rounded-lg text-sm 
                        px-5 py-2.5 text-center mr-auto"
                      >
                        Delete Animal
                      </button>
                      <button
                        onClick={() => routeToEditAnimal(animalData)} 
                        data-modal-hide="default-modal" 
                        type="button" 
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                        px-5 py-2.5 text-center"
                      >
                        Edit Animal
                      </button>
                      <button 
                        data-modal-hide="default-modal" 
                        type="button" 
                        onClick={() => setAnimalDetailsModalOpen(false)}
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 
                        focus:outline-none bg-white rounded-lg border border-gray-200 
                        hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 
                        focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 
                        dark:text-gray-400 dark:border-gray-600 dark:hover:text-white 
                        dark:hover:bg-gray-700"
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
