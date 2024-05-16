import React, {useEffect} from 'react'
import FarmerDashboard from '../components/dashboard/farmer/FarmerDashboard'
import CustomerDashboard from '../components/dashboard/customer/CustomerDashboard'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
        <div>
          {user && user.is_customer ? (
            <h1>
              Welcome to your User Dashboard
            </h1>
          ) : (
            <h1>
              Welcome to your Farmer Dashboard
            </h1>
          )}
          
        </div>
      </section>
      <section>
        {user && user.user_type === 'farmer' &&
          (
            <FarmerDashboard />
          )
        }
        {user && user.user_type === 'customer' &&
          (
            <CustomerDashboard />
          )
        }
      </section>
    </div>
  )
}
