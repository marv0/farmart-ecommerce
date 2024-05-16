import React, {useState, useEffect} from 'react'
import OrdersList from '../components/dashboard/farmer/OrdersList'
// import OrdersList from '../components/dashboard/customer/OrdersList'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function DashboardOrders() {
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
        {user &&
            <OrdersList />
        }
    </div>
  )
}
