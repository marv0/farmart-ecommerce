import React, {useState, useEffect} from 'react'
import OrdersList from '../components/dashboard/farmer/OrdersList'
// import OrdersList from '../components/dashboard/customer/OrdersList'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export default function DashboardOrders() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'));
  const [loading, setLoading] = useState(false)
  const [userOrders, setUserOrders] = useState([])

  useEffect(() => {
    if(!user){
      toast.error('Access denied')
      navigate('/auth/login')
    }else{
      const fetchUserOrders = async() => {
        try {
          setLoading(true)
          const response = await fetch('http://127.0.0.1:5555/animals', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          setUserOrders(data)
          setLoading(false)
        } catch (error) {
          toast.error('An unexpected error occured. Please try again later')
          setLoading(false)
        }
      }
      fetchUserOrders()
    }
  }, [user, navigate])
  
  return (
    <div>
      <div className="mx-auto max-w-7xl text-center">
        <h1 
          className="text-3xl font-bold tracking-tight text-gray-900"
        >
          All Your Orders
        </h1>
      </div>
        {user &&
            <OrdersList 
              loading = {loading}
              userOrders={userOrders}
            />
        }
    </div>
  )
}
