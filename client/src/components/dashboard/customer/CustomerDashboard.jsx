import React, {useState, useEffect} from 'react'
// import OrdersList from './OrdersList'
import OrdersList from '../farmer/OrdersList'
import InfoCards from '../farmer/InfoCards'

export default function CustomerDashboard({userOrders}) {
  const [pendingOrders, setPendingOrders] = useState([])
  
  useEffect(() => {
    if (userOrders && userOrders.length > 0) {
      const filteredOrders = userOrders.filter(order => order.status === 'pending');
      setPendingOrders(filteredOrders);
    }
  }, [userOrders])
  return (
    <div>
      <section>
            <InfoCards
              pendingOrders={pendingOrders}
              userOrders ={userOrders}
            />
      </section>
      {pendingOrders.length > 0 && 
        <>
          <div className="mx-auto max-w-7xl pt-2 text-center">
            <h1 
              className="text-xl font-bold tracking-tight text-green-700"
            >
              Here is a List of Your Pending Orders
            </h1>
          </div>
          <section>
              <OrdersList 
                userOrders={pendingOrders} 
                setPendingOrders = {setPendingOrders}
              />
          </section>
        </>
      }
    </div>
  )
}
