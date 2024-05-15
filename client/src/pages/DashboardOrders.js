import React, {useState, useEffect} from 'react'
import OrdersList from '../components/dashboard/farmer/OrdersList'
// import OrdersList from '../components/dashboard/customer/OrdersList'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const user = {
  id: 1,
  user_type: 'farmer'
}
// const user = {
//   id: 1,
//   user_type: 'customer'
// }

// const user = null
// }
export default function DashboardOrders() {
  const navigate = useNavigate()
  useEffect(() => {
    if(!user){
      toast.error('Access denied')
      navigate('/auth/login')
    }
  }, [navigate])
  
  return (
    <div>
        {user &&
            <OrdersList />
        }
    </div>
  )
}
