import React, {useState, useEffect} from 'react'
import { Outlet } from 'react-router-dom';
import MainDashboardNav from '../components/dashboard/MainDashboardNav'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import ResponsiveDasbhoardNav from '../components/dashboard/ResponsiveDasbhoardNav'
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

export default function DashboardLayout() {
  const navigate = useNavigate()
  const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
      if(!user){
        const intendedUrl = location.pathname;
        toast.error('Please login to view this page')
        // navigate('/auth/login')
        navigate(`/auth/login?redirect=${intendedUrl}`);
      }
    }, [])

    const logout = () =>{
      localStorage.removeItem("user")
      toast.success('Logout succesful')
      navigate('/auth/login')
    }
    return(
      <section>
        <div>
          <MainDashboardNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} logout={logout} />
        </div>
        <div>
          <div>
              <DashboardSidebar 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
                logout={logout} 
              />
          </div>
          <div>
              <ResponsiveDasbhoardNav 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen} 
                logout={logout}
              />
          </div>
        </div>
        <div>
          <section className="min-h-screen p-2 sm:ml-64 bg-gray-200">
            <div 
                className='p-2 border-2 border-gray-200 border-dashed rounded-lg 
                dark:border-gray-700 mt-14'
            >
                <Outlet />
            </div>
          </section>
        </div>
    </section>
    )
}
