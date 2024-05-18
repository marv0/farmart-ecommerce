import React, {useState, useEffect} from 'react'
import EditAnimal from '../components/dashboard/farmer/EditAnimal'
import {useParams} from 'react-router-dom'
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FarmerEditAnimal() {
  const navigate = useNavigate();
  const location = useLocation();
  const animalId = parseInt(useParams().animalId);
  // const [wantedAnimal, setWantedAnimal] = useState(null)
  const [loading, setLoading] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'));
  const wantedAnimal = location.state.animal
  console.log('Animal ID is:', animalId)

  useEffect(() => {
    if(user.user_type !== 'farmer'){
      toast.error('Unauthorized access')
      navigate('/')
    }
  }, [user, navigate])

  // useEffect(() => {
  //   const fetchAnimal = async () => {
  //     try {
  //       setLoading(true)
  //       const response = await fetch(`http://127.0.0.1:5555/update_animal/${animalId}`);
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setWantedAnimal(data);
  //       setLoading(false);
  //     } catch (error) {
  //       toast.error('An unexpected error occurred');
  //       console.error('Error fetching animal:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchAnimal();
  // }, [animalId]);
  const handleEditAnimalData = async(jsonData) => {
    console.log('JSON DATA is:', jsonData)
    console.log('And Animal ID is:', wantedAnimal.id)
    try {
      const response = await fetch(`http://127.0.0.1:5555/update_animal/${wantedAnimal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: jsonData
      });

      const responseData = await response.json();
      if(response.status === 200){
        toast.success('Animal updated successfully.')
      }else{
        toast.error(responseData.error)
      }
    } catch (error) {
      toast.error('An error occured. Please try again later!')
    }
  }

  return (
    <div>
        <EditAnimal 
          animal={wantedAnimal}
          loading={loading}
          handleEditAnimalData={handleEditAnimalData}
        />
    </div>
  )
}
