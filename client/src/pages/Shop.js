import React, {useState, useEffect} from 'react'
import AnimalsList from '../components/shop/AnimalsList'
import FilterForm from '../components/shop/FilterForm'
import { toast } from 'react-toastify'

export default function Shop() {
  const [animalsList, setAnimalsList] = useState([])
  const [loading, setLoading] = useState(false)

  const filterAnimals = async (filters) => {
    const query = new URLSearchParams(filters).toString();
    console.log('Query is: ', query)
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`http://127.0.0.1:5555/animals?${query}`);
      const data = await response.json();
      setAnimalsList(data);
    } catch (error) {
      toast.error('An error occured. Please try again later.')
    }
  };

  const resetFilters = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://127.0.0.1:5555/animals');
      const data = await response.json();
      setAnimalsList(data);
      setLoading(false);
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllAnimals = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://127.0.0.1:5555/animals');
        const data = await response.json();
        setAnimalsList(data)
        setLoading(false)
      } catch (error) {
        toast.error('An unexpected error occured. Please try again later')
        setLoading(false)
      }
    }
    fetchAllAnimals()
  }, [])

  function LoadingState(){
    return(
      <div className="pt-4 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <p className='text-red-600 text-center'>
          Please wait as we load animals...
        </p>
      </div>
    )
  }

  function NoAnimalsFound() {
    return(
      <div className="pt-4 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <h1 className='text-red-600 text-center'>
          No animals found.
        </h1>
      </div>
    )
  }
  return (
    <div>
        <section className='relative grid grid-cols-1 lg:grid-cols-12'>
            <div className='lg:sticky top-0 col-span-3 lg:h-screen'>
                <FilterForm
                  filterAnimals={filterAnimals}
                  resetFilters={resetFilters}
                />
            </div>
            <div className='col-span-9'>
              {loading ? (
                <LoadingState />
              ) : animalsList.length === 0 ? (
                <NoAnimalsFound />
              ) : (
                <AnimalsList animals={animalsList} />
              )}
            </div>
        </section>
    </div>
  )
}
