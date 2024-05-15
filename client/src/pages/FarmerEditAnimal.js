import React, {useState, useEffect} from 'react'
import EditAnimal from '../components/dashboard/farmer/EditAnimal'
import {useParams} from 'react-router-dom'
import { toast } from 'react-toastify';

export default function FarmerEditAnimal() {
  const animalId = parseInt(useParams().animalId);
  const [wantedAnimal, setWantedAnimal] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        setLoading(true)
        const response = await fetch(`http://127.0.0.1:5555/${animalId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWantedAnimal(data);
        setLoading(false);
      } catch (error) {
        toast.error('An unexpected error occurred');
        console.error('Error fetching animal:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimal();
  }, [animalId]);
  return (
    <div>
        <EditAnimal 
          // animal={wantedAnimal}
          loading={loading}
        />
    </div>
  )
}
