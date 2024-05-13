import React, {useState, useEffect} from 'react'
import AnimalsList from '../components/shop/AnimalsList'
import FilterForm from '../components/shop/FilterForm'
import { animals } from '../utils/animals'

export default function Shop() {
  const [animalsList, setAnimalsList] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setAnimalsList(animals)
    setLoading(false)
  }, [])

  function LoadingState(){
    return(
      <div>
        <p>
          Please wait as we load animals...
        </p>
      </div>
    )
  }
  return (
    <div>
        <section className='relative grid grid-cols-12'>
            <div className='sticky top-0 col-span-3 h-screen'>
                <FilterForm />
            </div>
            <div className='col-span-9'>
              {loading ? (
                <LoadingState />
              ) : (
                <AnimalsList animals={animalsList}/>
              )}
            </div>
        </section>
    </div>
  )
}
