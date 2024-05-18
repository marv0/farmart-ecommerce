import React, {useState} from 'react'
import { CiSearch } from "react-icons/ci";
import { animalBreeds } from '../../utils/animalBreeds';
import { animalTypes } from '../../utils/animalTypes';

export default function FilterForm({ filterAnimals, resetFilters }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [animalBreedSearch, setAnimalBreedSearch] = useState('')
  const [animalTypeSearch, setAnimalTypeSearch] = useState('')
  const [minimumAge, setMinimumAge] = useState(0)
  const [maximumAge, setMaximumAge] = useState(48)

  const formSubmit = (event) => {
    event.preventDefault();

    const filterFormData = {
      q: searchTerm,
      breed: animalBreedSearch,
      animal_type: animalTypeSearch,
      min_age: minimumAge,
      max_age: maximumAge,
    }
    // const jsonData = JSON.stringify(filterFormData);
    // console.log(jsonData)
    filterAnimals(filterFormData)
  }

  const resetForm = () => {
    setSearchTerm('')
    setAnimalBreedSearch('')
    setAnimalTypeSearch('')
    resetFilters()
  }
  return (
    <section>
      <div className="m-4 w-full max-w-screen-md">
        <div className="flex flex-col">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
            <form onSubmit={formSubmit} className="">
              <div className="relative mb-10 w-full flex  items-center justify-between rounded-md">
                <CiSearch className="absolute left-2 block h-5 w-5 text-gray-400"/>
                <input 
                  type="name" 
                  name="search"
                  value={searchTerm} 
                  onChange={(e)=> setSearchTerm(e.target.value)}
                  className="h-12 w-full cursor-text rounded-md border border-gray-100 
                  bg-gray-100 py-4 pr-40 pl-8 shadow-sm outline-none 
                  focus:green-500 focus:ring-1 focus:ring-green-400" 
                  placeholder="Search by type and breed" 
                />
              </div>

              <div className="grid grid-cols-1 gap-6 mb-2">

                <div className="flex flex-col">
                  <label 
                    htmlFor="breed" 
                    className="text-sm font-medium text-stone-600"
                  >
                    Animal Breed
                  </label>

                  <select 
                    id="breed" 
                    value={animalBreedSearch}
                    onChange={(e) => setAnimalBreedSearch(e.target.value)}
                    className="mt-2 block w-full rounded-md border border-gray-100 
                    bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-green-500 
                    focus:ring-1 focus:ring-green-400"
                  >
                    {animalBreeds?.map((breed, index) => {
                      return(
                        <option
                          key={index}
                          value={breed.name}
                        >
                          {breed.name}
                        </option>
                      )
                    })}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label 
                    htmlFor="breed" 
                    className="text-sm font-medium text-stone-600"
                  >
                    Animal Type
                  </label>

                  <select 
                    id="breed" 
                    value={animalTypeSearch}
                    onChange={(e) => setAnimalTypeSearch(e.target.value)}
                    className="mt-2 block w-full rounded-md border border-gray-100 
                    bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-green-500 
                    focus:ring-1 focus:ring-green-400"
                  >
                    {animalTypes?.map((type, index) => {
                      return(
                        <option
                          key={index}
                          value={type.name}
                        >
                          {type.name}
                        </option>
                      )
                    })}
                    
                  </select>
                </div>
              </div>
              <section className='flex items-center justify-between space-x-8'>
                <div>
                  <label 
                    htmlFor="minimumAge" 
                    class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Min. Age(Months)
                  </label>
                  
                  <input 
                    type="number" 
                    id="minimumAge" 
                    value={minimumAge}
                    onChange={(e) => setMinimumAge(e.target.value)} 
                    class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 
                    text-sm focus focus:ring-green-500 focus:border-green-500 block w-full py-2.5 px-2"
                    placeholder="999" 
                    required 
                  />
                </div>
                <div>
                  <label 
                    htmlFor="maximumAge" 
                    class="block mb-2 text-sm font-bold text-gray-900 dark:text-white"
                  >
                    Max. Age(Months)
                  </label>
                  
                  <input 
                    type="number" 
                    id="maximumAge" 
                    value={maximumAge}
                    onChange={(e) => setMaximumAge(e.target.value)}
                    class="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 
                    text-sm focus focus:ring-green-500 focus:border-green-500 block w-full py-2.5 px-2"
                    placeholder="999" 
                    required 
                  />
                </div>
              </section>

              <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                <button 
                  onClick={resetForm}
                  className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 
                  outline-none hover:opacity-80"
                >
                  Reset
                </button>
                <button 
                  type='submit'
                  className="rounded-lg bg-green-600 px-8 py-2 font-medium text-white 
                  outline-none hover:opacity-80"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
