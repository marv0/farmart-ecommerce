import React from 'react'
import Hero from '../components/homepage/Hero'
import Features from '../components/homepage/Features'
import Categories from '../components/homepage/Categories'
import NewArrivals from '../components/homepage/NewArrivals'

export default function Home() {
  return (
    <div>
      <div>
        <Hero />
      </div>
      <div>
        <Features />
      </div>
      <div>
        <Categories />
      </div>
      <div>
        <NewArrivals />
      </div>
    </div>
  )
}
