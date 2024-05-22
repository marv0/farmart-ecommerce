import React, {useEffect, useState} from 'react'
import FarmerDashboard from '../components/dashboard/farmer/FarmerDashboard'
import CustomerDashboard from '../components/dashboard/customer/CustomerDashboard'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'));
  const [userOrders, setUserOrders] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchFarmerOrders = async() => {
    try {
      setLoading(true)
      const response = await fetch('http://127.0.0.1:5555/farmer_orders', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'application/json',
            },
      });
      const data = await response.json();
      if(response.status === 200){
        setUserOrders(data)
        setLoading(false)
      }
    } catch (error) {
      toast.error('An unexpected error occured. Please try again later')
    }
  }

  const fetchConsumerOrders = async() => {
    try {
      setLoading(true)
      const response = await fetch('http://127.0.0.1:5555/consumer_orders', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'application/json',
            },
      });
      const data = await response.json();
      if(response.status === 200){
        setUserOrders(data)
        setLoading(false)
      }
    } catch (error) {
      toast.error('An unexpected error occured. Please try again later')
    }
  }
  useEffect(() => {
    if(!user){
      toast.error('Access denied')
      navigate('/auth/login')
    }
  }, [user, navigate])

  useEffect(() => {
    if(user && user === 'farmer'){
      fetchFarmerOrders()
    }else if(user && user === 'consumer'){
      fetchConsumerOrders()
    }
  }, [user])
  
  return (
    <div>
      <section>
        <div className='pb-4'>
          {user && user === 'consumer' && (
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
        {user && user === 'consumer' &&
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
