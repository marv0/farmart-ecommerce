import React from 'react'
import OrdersList from './OrdersList'

export default function CustomerDashboard() {
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
            <OrdersList />
        </section>
    </div>
  )
}
