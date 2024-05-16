import React, {useEffect} from 'react'
import PostNewAnimal from '../components/dashboard/farmer/PostNewAnimal'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function FarmerPostAnimal() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if(!user){
      toast.error('Access denied')
      navigate('/auth/login')
    }
    if(user.user_type !== 'farmer'){
      toast.error('Access denied')
      navigate('/user-dashboard')
    }
  }, [user, navigate]);

  const handleAnimalData = async(animalData) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/add_animal`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: animalData
      });

      const responseData = await response.json();

      if(response.status === 201){
        toast.success('Animal Succesfully Created')
      }else{
        // toast.error(responseData.error)
        console.log(responseData.error)
      }
    } catch (error) {
      // toast.error('An error occured')
      toast.error(error)
      console.log('An error occured', error)
    }
  }
  return (
    <div>
        <PostNewAnimal 
          handleAnimalData={handleAnimalData}
        />
    </div>
  )
}
