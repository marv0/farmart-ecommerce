import React, {useState, useEffect} from 'react'
import InfoCards from './InfoCards'
import OrdersList from './OrdersList'
import { animals } from '../../../utils/animals'
// import AnimalsList from './AnimalsList'
// import PostNewAnimal from './PostNewAnimal'
// import EditAnimal from './EditAnimal'

export default function FarmerDashboard({userOrders}) {
  const [pendingOrders, setPendingOrders] = useState(null)

  useEffect(() => {
    if (userOrders && userOrders.length > 0) {
      const filteredOrders = userOrders.filter(order => order.status === 'pending');
      setPendingOrders(filteredOrders);
    }
  }, [userOrders])
  return (
    <div>
        <section>
            <InfoCards />
        </section>
        <section>
          <div className="mx-auto max-w-7xl pt-4 text-center">
            <h1 
              className="text-3xl font-bold tracking-tight text-gray-900"
            >
              Your Pending Orders
            </h1>
          </div>
            <OrdersList
              activeOrders={animals} 
              userOrders={pendingOrders}
            />
            {/* <AnimalsList animals={animals} /> */}
            {/* <PostNewAnimal /> */}
            {/* <EditAnimal animal={wantedAnimal}/> */}
        </section>
    </div>
  )
}
