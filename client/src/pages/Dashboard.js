import React, {useEffect} from 'react'
import FarmerDashboard from '../components/dashboard/farmer/FarmerDashboard'
import CustomerDashboard from '../components/dashboard/customer/CustomerDashboard'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const userOrders = [
  {
    id: 1,
    animal_id: 1,
    animal_type: 'Cow',
    animal_breed: 'Holstein',
    quantity: 4,
    status: 'pending',
    created_at: '2024-05-21 19:50:25'
  },
  {
    id: 2,
    animal_id: 2,
    animal_type: 'Sheep',
    animal_breed: 'Merino',
    quantity: 10,
    status: 'completed',
    created_at: '2024-05-20 14:30:10'
  },
  {
    id: 3,
    animal_id: 3,
    animal_type: 'Goat',
    animal_breed: 'Boer',
    quantity: 5,
    status: 'active',
    created_at: '2024-05-19 09:15:45'
  },
  {
    id: 4,
    animal_id: 4,
    animal_type: 'Chicken',
    animal_breed: 'Rhode Island Red',
    quantity: 20,
    status: 'cancelled',
    created_at: '2024-05-18 16:50:30'
  },
  {
    id: 5,
    animal_id: 5,
    animal_type: 'Pig',
    animal_breed: 'Berkshire',
    quantity: 7,
    status: 'pending',
    created_at: '2024-05-17 12:00:00'
  },
  {
    id: 6,
    animal_id: 6,
    animal_type: 'Duck',
    animal_breed: 'Pekin',
    quantity: 15,
    status: 'active',
    created_at: '2024-05-16 18:45:15'
  },
  {
    id: 7,
    animal_id: 7,
    animal_type: 'Turkey',
    animal_breed: 'Bronze',
    quantity: 3,
    status: 'completed',
    created_at: '2024-05-15 13:20:05'
  },
  {
    id: 8,
    animal_id: 8,
    animal_type: 'Rabbit',
    animal_breed: 'Flemish Giant',
    quantity: 8,
    status: 'active',
    created_at: '2024-05-14 20:30:50'
  },
  {
    id: 9,
    animal_id: 9,
    animal_type: 'Horse',
    animal_breed: 'Arabian',
    quantity: 2,
    status: 'cancelled',
    created_at: '2024-05-13 11:25:35'
  },
  {
    id: 10,
    animal_id: 10,
    animal_type: 'Goat',
    animal_breed: 'Nubian',
    quantity: 6,
    status: 'pending',
    created_at: '2024-05-12 15:40:20'
  }
];
export default function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if(!user){
      toast.error('Access denied')
      navigate('/auth/login')
    }
  }, [user, navigate])
  
  return (
    <div>
      <section>
        <div className='pb-4'>
          {user && user === 'customer' && (
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome to your User Dashboard
            </h1>
          )} 
          {user && user === 'farmer' && (
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome to your Farmer Dashboard
            </h1>
          )}
        </div>
      </section>
      <section>
        {user && user === 'farmer' &&
          (
            <FarmerDashboard
              userOrders={userOrders}
            />
          )
        }
        {user && user === 'customer' &&
          (
            <CustomerDashboard
              userOrders={userOrders}
            />
          )
        }
      </section>
    </div>
  )
}
