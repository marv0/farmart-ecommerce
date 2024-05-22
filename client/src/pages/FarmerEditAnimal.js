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
    if(user !== 'farmer'){
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
      setLoading(true)
      const response = await fetch(`http://127.0.0.1:5555/update_animal/${wantedAnimal.id}`, {
        method: 'PUT',
        headers: {
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          mode:"no-cors",
        },
        body: jsonData
      });

      const responseData = await response.json();
      if(response.status === 200){
        setLoading(false)
        toast.success('Animal updated successfully.')
        navigate('/farmer/animals')
      }else{
        toast.error(responseData.error)
        setLoading(false)
        navigate('/user-dashboard')
      }
    } catch (error) {
      toast.error('An error occured. Please try again later!')
      setLoading(false)
      navigate('/user-dashboard')
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
