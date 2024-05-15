import React, {useState, useEffect} from 'react'
import AnimalsList from '../components/dashboard/farmer/AnimalsList'
import { animals } from '../utils/animals'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function FarmerAnimalsList() {
  const navigate = useNavigate()
  const [currentFarmerAnimals, setCurrentFarmerAnimals] = useState([])
  const [loading, setLoading] = useState(false)
  const user = {id: 1, user_type:'farmer'}
  // const user = null

  useEffect(() => {
    if(user && user.user_type === 'farmer'){
      setLoading(true)
      const fetchFarmerAnimals = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5555/');
          const data = await response.json();
          setCurrentFarmerAnimals(data)
          setLoading(false)
        } catch (error) {
          toast.error('An error occured. Please try again later')
          setLoading(false)
        }
      }

      fetchFarmerAnimals()
      setLoading(false)
    } else{
      toast.error('You have no permission to view this page')
      navigate('/')
    }
  }, [])

  return (
    <div>
        <AnimalsList 
          animals={animals}
        />
    </div>
  )
}
