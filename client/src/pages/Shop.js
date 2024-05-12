import React from 'react'
import AnimalsList from '../components/shop/AnimalsList'
import FilterForm from '../components/shop/FilterForm'

export default function Shop() {
  return (
    <div>
        <section className='relative grid grid-cols-12'>
            <div className='sticky top-0 col-span-3 h-screen'>
                <FilterForm />
            </div>
            <div className='col-span-9'>
                <AnimalsList />
            </div>
        </section>
    </div>
  )
}
