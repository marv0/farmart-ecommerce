import React, {useState} from 'react'
import AnimalDetailsModal from './AnimalDetailsModal'

export default function AnimalsList({animals}) {
    const [animalDetailsModalOpen, setAnimalDetailsModalOpen] = useState(false)
    const [animalData, setAnimalData] = useState(null)

    const animalDetails = (animal) => {
        setAnimalData(animal)
        console.log('Animal Clicked')
        setAnimalDetailsModalOpen(true)
    }
  return (
    <div>
        <section className='pb-2 flex justify-center'>
            <h1 className='font-semibold text-xl inline-block '>
                Here is a list of your animals
            </h1>
        </section>
        <section>
            <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-5">
                {animals?.map((animal, index) => {
                    return(
                        <div 
                            key={index}
                            className="rounded overflow-hidden shadow-lg"
                        >
                            <div className="relative">
                                <div 
                                    className='cursor-pointer'
                                    onClick={() => animalDetails(animal)}
                                >
                                    <img className="w-full h-40"
                                        src={animal.photo}
                                        alt="Sunset in the mountains" 
                                    />
                                    <div
                                        className="hover:bg-transparent transition duration-300 
                                        absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"
                                    >
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={() => animalDetails(animal)}
                                        className="absolute bottom-0 left-0 bg-green-600 px-4 py-2 
                                        text-white text-sm hover:bg-green-700 
                                        transition duration-500 ease-in-out"
                                    >
                                        {animal.type}
                                    </button>
                                </div>
                            </div>
                            <div className="px-3 py-4">
                                <button
                                    onClick={() => animalDetails(animal)}
                                    className="font-semibold text-lg inline-block 
                                    hover:text-green-600 transition duration-500 ease-in-out"
                                >
                                    Breed: {animal.breed}
                                </button>
                                <p className="text-gray-500 text-sm">
                                    {animal.description}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <AnimalDetailsModal 
                animalDetailsModalOpen={animalDetailsModalOpen}
                setAnimalDetailsModalOpen={setAnimalDetailsModalOpen}
                animalData={animalData}
            />
        </section>
    </div>
  )
}
