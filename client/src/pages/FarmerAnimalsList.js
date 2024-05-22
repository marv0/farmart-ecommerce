import React, {useState, useEffect} from 'react'
import AnimalsList from '../components/dashboard/farmer/AnimalsList'
// import { animals } from '../utils/animals'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function FarmerAnimalsList() {
  const navigate = useNavigate()
  const [currentFarmerAnimals, setCurrentFarmerAnimals] = useState([])
  const [loading, setLoading] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if(user && user === 'farmer'){
      setLoading(true)
      const fetchFarmerAnimals = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5555/get_farmer_animals', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          if(response.status === 200){
            setCurrentFarmerAnimals(data)
            setLoading(false)
          }else{
            toast.error('Unauthorized access')
            setLoading(false)
            navigate('/user-dashboard')
          }
          
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
  }, [navigate, user])

  if(loading){
    return(
      <div>
        <h1>
          Loading. Please wait.....
        </h1>
      </div>
    )
  }
  return (
    <div>
        <AnimalsList 
          // animals={animals}
          animals={currentFarmerAnimals}
        />
    </div>
  )
}
