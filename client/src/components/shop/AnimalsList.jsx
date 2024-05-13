import React from 'react'
import AnimalCard from './AnimalCard'

// const animals = [
//     {
//         id: 1,
//         name: 'Breeding Cow'
//     },
//     {
//         id: 1,
//         name: 'Breeding Cow'
//     },
//     {
//         id: 1,
//         name: 'Breeding Cow'
//     },
//     {
//         id: 1,
//         name: 'Breeding Cow'
//     },
//     {
//         id: 1,
//         name: 'Breeding Cow'
//     },
//     {
//         id: 1,
//         name: 'Breeding Cow'
//     },
//     {
//         id: 1,
//         name: 'Breeding Cow'
//     },
//     {
//         id: 1,
//         name: 'Breeding Cow'
//     },
//     {
//         id: 1,
//         name: 'Breeding Cow'
//     },
//     {
//         id: 1,
//         name: 'Breeding Cow'
//     },
//     {
//         id: 1,
//         name: 'Breeding Cow'
//     },
//     {
//         id: 1,
//         name: 'Breeding Cow'
//     },
//     {
//         id: 1,
//         name: 'Breeding Cow'
//     },
//     {
//         id: 1,
//         name: 'Breeding Cow'
//     },
//     {
//         id: 1,
//         name: 'Breeding Cow'
//     },
//     {
//         id: 1,
//         name: 'Breeding Cow'
//     },
// ]
export default function AnimalsList({animals}) {
  return (
    <div>
        <section className="bg-white py-12 text-gray-700 sm:py-4 lg:py-4">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="mt-2 grid grid-cols-2 gap-6 lg:grid-cols-4 sm:gap-4 lg:mt-2">
                    {animals?.map((animal, index) => {
                        return(
                            <AnimalCard 
                                key={index}
                                animal={animal}
                            />
                        )
                    })}
                </div>
            </div>
        </section>
    </div>
  )
}
