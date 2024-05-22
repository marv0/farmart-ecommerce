import React, {useState, useEffect} from 'react'
import AnimalDetailsModal from './AnimalDetailsModal'
import { toast } from 'react-toastify'

export default function AnimalsList({animals}) {
    const [animalDetailsModalOpen, setAnimalDetailsModalOpen] = useState(false)
    const [animalData, setAnimalData] = useState(null)
    const [animalList, setAnimalList] = useState(animals);
    console.log('Initial Animals are:', animalList)

    useEffect(() => {
        setAnimalList(animals)
    }, [animals])

    const animalDetails = (animal) => {
        setAnimalData(animal)
        console.log('Animal Clicked')
        setAnimalDetailsModalOpen(true)
    }

    const deleteAnimal = async(animal_id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5555/delete_animal/${animal_id}`, {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                }
            });
            const responseData = await response.json();
            if(response.status === 200){
                toast.success('Animal succesfully deleted')
                setAnimalList(animals.filter(animal => animal.id !== animal_id))
                setAnimalDetailsModalOpen(false)
            }else{
                toast.error(responseData.error)
            }
        } catch (error) {
            toast.error('An unexpected error occured. Please try again later')
        }
    }
  return (
    <div>
        <section className='pb-2 flex justify-center'>
            <h1 className='font-semibold text-xl inline-block '>
                Here is a list of your animals
            </h1>
        </section>
        {animalList.length > 0 ? (
            <section>
                <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-5">
                    {animalList?.map((animal, index) => {
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
                    deleteAnimal={deleteAnimal}
                />
            </section>
        ) : (
            <section>
                <h1>
                    You have not listed any animals for sale
                </h1>
            </section>
        )}
    </div>
  )
}
