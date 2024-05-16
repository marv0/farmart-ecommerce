import React, {useState, useEffect} from 'react'
import AnimalsList from '../components/shop/AnimalsList'
import FilterForm from '../components/shop/FilterForm'
import { animals } from '../utils/animals'
// import { toast } from 'react-toastify';

export default function Shop() {
  const [animalsList, setAnimalsList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setAnimalsList(animals)
    setLoading(false)
  }, [])

  // useEffect(() => {
  //   const fetchAllAnimals = async () => {
  //     try {
  //       setLoading(true)
  //       const response = await fetch('http://127.0.0.1:5555/animals');
  //       const data = await response.json();
  //       setAnimalsList(data)
  //       setLoading(false)
  //     } catch (error) {
  //       toast.error('An unexpected error occured. Please try again later')
  //       setLoading(false)
  //     }
  //   }
  //   fetchAllAnimals()
  // }, [])

  function LoadingState(){
    return(
      <div>
        <p>
          Please wait as we load animals...
        </p>
      </div>
    )
  }

  if(animalsList.length === 0){
    return(
      <div>
        <p>
          No animals found
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
