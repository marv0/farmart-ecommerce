import React, {useState, useEffect} from 'react'
import PostNewAnimal from '../components/dashboard/farmer/PostNewAnimal'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function FarmerPostAnimal() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'));
  const [loading, setLoading] = useState(false)
  // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcxNjIxNDIzOCwianRpIjoiYTZkNDI0NzktNjc2MC00NGJkLTllNjYtZjgzYjljZjdlZTQ2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6eyJpZCI6NSwidXNlcl90eXBlIjoiZmFybWVyIn0sIm5iZiI6MTcxNjIxNDIzOCwiY3NyZiI6IjdmYzg0Y2NlLWRhNGItNGMzZS05MDNiLWU4ZjE2Nzk3ZjUxOSIsImV4cCI6MTcxNjIxNzgzOH0.5RRO1XQJI3myhbp0sGzcgrRNCgWdSQK3w7Bf07WlN7E"

  useEffect(() => {
    if(!user){
      toast.error('Access denied')
      navigate('/auth/login')
    }
    if(user !== 'farmer'){
      toast.error('Access denied')
      navigate('/user-dashboard')
    }
  }, [user, navigate]);

  const handleAnimalData = async(animalData) => {
    try {
      setLoading(true)
      const access_token = localStorage.getItem('access_token')
      console.log(access_token)
      const response = await fetch(`http://127.0.0.1:5555/add_animal`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: animalData
      });

      const responseData = await response.json();

      if(response.status === 201){
        toast.success('Animal Succesfully Created')
        setLoading(false)
        navigate('/farmer/animals')
      }else{
        toast.error(responseData.error)
        setLoading(false)
        navigate('/user-dashboard')
      }
    } catch (error) {
      // toast.error('An error occured')
      toast.error('An unexpected error occured. Please try again later!')
      setLoading(false)
      console.log('An error occured', error)
      navigate('/user-dashboard')
    }
  }
  return (
    <div>
        <PostNewAnimal 
          handleAnimalData={handleAnimalData}
          loading={loading}
        />
    </div>
  )
}
