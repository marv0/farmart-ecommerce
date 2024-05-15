import React, {useState} from 'react'
import { CiSearch } from "react-icons/ci";
import { animalBreeds } from '../../utils/animalBreeds';
import { animalTypes } from '../../utils/animalTypes';

export default function FilterForm() {
  const [searchTerm, setSearchTerm] = useState('')
  const [breedSearch, setBreedSearch] = useState('')
  const [typeSearch, setTypeSearch] = useState('')

  const formSubmit = (event) => {
    event.preventDefault();

    const formData = {
    }
    const jsonData = JSON.stringify(formData);
    console.log(jsonData)
  }

  const resetForm = () => {
    setSearchTerm('')
    setBreedSearch('')
    setTypeSearch('')
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

              <div className="grid grid-cols-1 gap-6">

                <div className="flex flex-col">
                  <label 
                    htmlFor="breed" 
                    className="text-sm font-medium text-stone-600"
                  >
                    Animal Breed
                  </label>

                  <select 
                    id="breed" 
                    value={breedSearch}
                    onChange={(e) => setBreedSearch(e.target.value)}
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
                    value={typeSearch}
                    onChange={(e) => setTypeSearch(e.target.value)}
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

              <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                <button 
                  onClick={resetForm}
                  className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 
                  outline-none hover:opacity-80"
                >
                  Reset
                </button>
                <button 
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
