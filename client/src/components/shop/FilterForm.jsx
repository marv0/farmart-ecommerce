import React from 'react'
import { CiSearch } from "react-icons/ci";

export default function FilterForm() {
  return (
    <section>
      <div className="m-4 w-full max-w-screen-md">
        <div className="flex flex-col">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
            <form className="">
              <div className="relative mb-10 w-full flex  items-center justify-between rounded-md">
                <CiSearch className="absolute left-2 block h-5 w-5 text-gray-400"/>
                <input 
                  type="name" 
                  name="search" 
                  className="h-12 w-full cursor-text rounded-md border border-gray-100 
                  bg-gray-100 py-4 pr-40 pl-8 shadow-sm outline-none 
                  focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
                  placeholder="Search by type and breed" 
                />
              </div>

              <div className="grid grid-cols-1 gap-6">
                {/* <div className="flex flex-col">
                  <label 
                    htmlFor="name" 
                    className="text-sm font-medium text-stone-600"
                  >
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Raspberry juice" 
                    className="mt-2 block w-full rounded-md border border-gray-100 
                    bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 
                    focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
                  />
                </div> */}

                <div className="flex flex-col">
                  <label 
                    htmlFor="breed" 
                    className="text-sm font-medium text-stone-600"
                  >
                    Breed
                  </label>

                  <select 
                    id="breed" 
                    className="mt-2 block w-full rounded-md border border-gray-100 
                    bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 
                    focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option>
                      Cadberry
                    </option>
                  </select>
                </div>

                {/* <div className="flex flex-col">
                  <label 
                    htmlFor="date" 
                    className="text-sm font-medium text-stone-600"
                  >
                    Date of Entry
                  </label>
                  <input 
                    type="date" 
                    id="date" 
                    className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 
                    bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 
                    focus:ring focus:ring-blue-200 focus:ring-opacity-50" 
                  />
                </div> */}

                {/* <div className="flex flex-col">
                  <label 
                    htmlFor="status" 
                    className="text-sm font-medium text-stone-600"
                  >
                    Status
                  </label>

                  <select 
                    id="status" 
                    className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 
                    bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 
                    focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    <option>Dispached Out</option>
                    <option>In Warehouse</option>
                    <option>Being Brought In</option>
                  </select>
                </div> */}

              </div>

              <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                <button 
                  className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 
                  outline-none hover:opacity-80 focus:ring"
                >
                  Reset
                </button>
                <button 
                  className="rounded-lg bg-blue-600 px-8 py-2 font-medium text-white 
                  outline-none hover:opacity-80 focus:ring"
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
