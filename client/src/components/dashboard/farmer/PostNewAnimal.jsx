import React, {useState} from 'react'
import { animalTypes } from '../../../utils/animalTypes'
import { animalBreeds } from '../../../utils/animalBreeds'

export default function PostNewAnimal({handleAnimalData, loading}) {
    const [animalType, setAnimalType] = useState(animalTypes[0].name)
    const [animalBreed, setAnimalBreed] = useState(animalBreeds[0].name)
    const [animalAge, setAnimalAge] = useState(1)
    const [animalPrice, setAnimalPrice] = useState(1)
    const [animalDescription, setAnimalDescription] = useState('')
    const [animalQuantity, setAnimalQuantity] = useState(1)
    const [animalPhoto, setAnimalPhoto] = useState(null)

    const handleFileChange = (e) => {
        setAnimalPhoto(e.target.files[0]);
    };

    const handleFormSubmit = async(event) => {
        event.preventDefault(); 

        const formData = new FormData();
        formData.append('type', animalType);
        formData.append('breed', animalBreed);
        formData.append('age', animalAge);
        formData.append('price', animalPrice);
        formData.append('description', animalDescription);
        formData.append('quantity', animalQuantity);
        formData.append('image', animalPhoto);

        await handleAnimalData(formData)
    }
  return (
    <div>
        <section>
            <div className='py-8'>
                <div className='flex justify-center'>
                    <h5 
                        className="mb-2 text-2xl capitalize font-bold tracking-tight text-gray-900 
                        dark:text-white"
                    >
                        Add a new animal to your catalogue
                    </h5>
                </div>
                <form 
                    onSubmit={handleFormSubmit}
                    className="w-8/12 mx-auto p-4 bg-white border 
                    border-gray-200 rounded-lg shadow"
                >
                    <section className='flex items-center gap-4 mb-5'>
                        <div className='w-1/2'>
                            <label 
                                htmlFor="animalType" 
                                className="block mb-2 text-sm font-semibold text-gray-900"
                            >
                                Animal Type
                            </label>
                            <div className="mt-2">
                                <select 
                                    id="animalType" 
                                    name="animalType" 
                                    value={animalType}
                                    onChange={(e) => setAnimalType(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                                    p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                                    dark:focus:border-blue-500"
                                >
                                    {animalTypes?.map((type, index) => {
                                        return(
                                            <option 
                                                key={index}
                                                value={type.name}
                                                className='hover:cursor-pointer'
                                            >
                                                {type.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>

                        <div className='w-1/2'>
                            <label 
                                htmlFor="animalBreed" 
                                className="block mb-2 text-sm font-semibold text-gray-900"
                            >
                                Breed
                            </label>
                            <div className="mt-2">
                                <select 
                                    id="animalBreed" 
                                    name="animalBreed" 
                                    value={animalBreed}
                                    onChange={(e) => setAnimalBreed(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                    rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                                    p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                    dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                                    dark:focus:border-blue-500"
                                >
                                    {animalBreeds?.map((breed, index) => {
                                        return(
                                            <option 
                                                key={index}
                                                value={breed.name}
                                                className='hover:cursor-pointer'
                                            >
                                                {breed.name}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </section>

                    <section className='flex items-center gap-4 mb-5'>
                        <div className='w-1/2'>
                            <label 
                                htmlFor="animalAge" 
                                className="block mb-2 text-sm font-semibold text-gray-900"
                            >
                                Age
                            </label>
                            <input 
                                type="number" 
                                id="animalAge" 
                                value={animalAge}
                                onChange={(e)=>setAnimalAge(e.target.value)}
                                aria-describedby="helper-text-explanation" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                                p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                                dark:focus:border-blue-500" 
                                placeholder="Animal age" 
                                required 
                            />
                        </div>

                        <div className='w-1/2'>
                            <label 
                                htmlFor="animalPrice" 
                                className="block mb-2 text-sm font-semibold text-gray-900"
                            >
                                Price (Ksh)
                            </label>
                            <input 
                                type="number" 
                                id="animalPrice" 
                                value={animalPrice}
                                onChange={(e)=> setAnimalPrice(e.target.value)}
                                aria-describedby="helper-text-explanation" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                                p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                                dark:focus:border-blue-500" 
                                placeholder="Animal Price" 
                                required 
                            />
                        </div>
                    </section>

                    <div className="mb-5">
                        <label 
                            htmlFor="animalDescription" 
                            className="block mb-2 text-sm font-semibold text-gray-900"
                        >
                            Description
                        </label>
                        <textarea 
                            id="animalDescription" 
                            value={animalDescription}
                            onChange={(e) => setAnimalDescription(e.target.value)}
                            rows="4" 
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 
                            rounded-lg border border-gray-300 focus:ring-blue-500 
                            focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 
                            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                            dark:focus:border-blue-500" 
                            placeholder="Describe the animal..."
                        ></textarea>
                    </div>

                    <section className='flex items-start gap-4 mb-5'>
                        <div className='w-1/2'>
                            <label 
                                htmlFor="animalQuantity" 
                                className="block mb-2 text-sm font-semibold text-gray-900"
                            >
                                Quantity
                            </label>
                            <input 
                                type="number" 
                                id="animalQuantity" 
                                value={animalQuantity}
                                onChange={(e)=>setAnimalQuantity(e.target.value)}
                                aria-describedby="helper-text-explanation" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                                p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
                                dark:focus:border-blue-500" 
                                placeholder="Number of animals available" 
                                required 
                            />
                        </div>

                        <div className='w-1/2'>
                            <label 
                                htmlFor="animalPhoto" 
                                className="block mb-2 text-sm font-semibold text-gray-900"
                            >
                                Animal Photo
                            </label>
                            <input 
                                id="animalPhoto"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                                rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
                                p-2.5 cursor-pointer" 
                            />
                            <div 
                                className="mt-1 text-sm text-gray-500 dark:text-gray-300" 
                                id="user_avatar_help"
                            >
                                An animal photo helps your potential clients understand your animal more
                            </div>
                        </div>
                    </section>

                    <div className='flex justify-center'>
                        {loading ? (
                            <button 
                                type="button" 
                                className="text-white bg-green-600 hover:bg-green-800
                                font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                                disabled:bg-gray-300 disabled:text-gray-500"
                                disabled
                            >
                                Please Wait...
                            </button>
                        ) : (
                            <button 
                                type="submit" 
                                className="text-white bg-green-600 hover:bg-green-800
                                font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Post Now
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </section>
    </div>
  )
}
