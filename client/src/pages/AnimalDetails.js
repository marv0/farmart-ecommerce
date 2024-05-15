import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
// import friesianCow from '../assets/friesian.jpg'
import { animals } from '../utils/animals'
import { increment, decrement, productQtyInCartSelector } from '../store/features/CartSlice'

function CartButton({animal}){
    const qty = useSelector(state=>productQtyInCartSelector(state, animal.id))
    const dispatch = useDispatch()

    if(!qty){
        return(
            <button 
                onClick={() => dispatch(increment(animal))}
                className="w-full bg-green-700 dark:bg-gray-600 text-white 
                py-2 px-4 rounded-full font-bold hover:bg-gray-800 
                dark:hover:bg-gray-700"
            >
                Add to Cart
            </button>
        )
    }
    return(
        <button 
            onClick={() => dispatch(decrement(animal))}
            className="w-full bg-green-700 dark:bg-gray-600 text-white 
            py-2 px-4 rounded-full font-bold hover:bg-gray-800 
            dark:hover:bg-gray-700"
        >
            Remove From Cart
        </button>
    )
}
export default function AnimalDetails() {
    const animalId = parseInt(useParams().animalId);
    const [animal, setAnimal] = useState(null)
    const [loading, setLoading] = useState(false)
    const [wantedAnimal, setWantedAnimal] = useState(null)

    useEffect(() => {
        setLoading(true);
        const wantedAnimal = animals.find(animal => animal.id === animalId);
        setAnimal(wantedAnimal)
        setLoading(false);
    }, [animalId]);

    // useEffect(() => {
    //     const fetchAnimal = async () => {
    //       try {
    //         setLoading(true)
    //         const response = await fetch(`http://127.0.0.1:5555/${animalId}`);
    //         if (!response.ok) {
    //           throw new Error('Network response was not ok');
    //         }
    //         const data = await response.json();
    //         setWantedAnimal(data);
    //         setLoading(false);
    //       } catch (error) {
    //         toast.error('An unexpected error occurred');
    //         console.error('Error fetching animal:', error);
    //       } finally {
    //         setLoading(false);
    //       }
    //     };
    
    //     fetchAnimal();
    //   }, [animalId]);

    if(loading){
        return(
            <div>
                <p>
                    Please wait....
                </p>
            </div>
        )
    }

    if (!animal) {
        return (
            <div>
                <p>
                    No animal data available.
                </p>
            </div>
        );
    }
  return (
    <div>
        <div className="bg-gray-100 dark:bg-gray-800 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            <img 
                                className="w-full h-full object-cover" 
                                src={animal.photo}
                                alt="Product Imag" 
                            />
                        </div>
                        <div className="flex -mx-2 mb-4 justify-center">
                            <div className="w-1/2 px-2">
                                <CartButton animal={animal} />
                            </div>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 
                            className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
                        >
                            {animal.type}
                        </h2>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span 
                                    className="font-bold text-gray-700 dark:text-gray-300"
                                >
                                    Breed:
                                </span>
                                <span className="ms-1 text-gray-600 dark:text-gray-300">
                                    {animal.breed}
                                </span>
                            </div>
                        </div>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span 
                                    className="font-bold text-gray-700 dark:text-gray-300"
                                >
                                    Price:
                                </span>
                                <span className="ms-1 text-gray-600 dark:text-gray-300">
                                    Ksh. {animal.price}
                                </span>
                            </div>
                        </div>
                        <div className="flex mb-4">
                            <div>
                                <span 
                                    className="font-bold text-gray-700 dark:text-gray-300"
                                >
                                    Age:
                                </span>
                                <span 
                                    className="ms-2 text-gray-600 dark:text-gray-300"
                                >
                                    {animal.age}
                                </span>
                            </div>
                        </div>
                        <div>
                            <span 
                                className="font-bold text-gray-700 dark:text-gray-300"
                            >
                                Animal Description:
                            </span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                {animal.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
