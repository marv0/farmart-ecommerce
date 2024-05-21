import React, {useState, useEffect} from 'react'
// import OrdersList from './OrdersList'
import OrdersList from '../farmer/OrdersList'

export default function CustomerDashboard({userOrders}) {
  const [pendingOrders, setPendingOrders] = useState(null)

  useEffect(() => {
    if (userOrders && userOrders.length > 0) {
      const filteredOrders = userOrders.filter(order => order.status === 'pending');
      setPendingOrders(filteredOrders);
    }
  }, [])
  return (
    <div>
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
            />
        </section>
    </div>
  )
}
