import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import Shop from "../pages/Shop";
import UserLogin from "../pages/UserLogin";
import AnimalDetails from "../pages/AnimalDetails";
import UserRegister from "../pages/UserRegister";
import FarmerRegister from "../pages/FarmerRegister";
import PageNotFound from "../pages/PageNotFound";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Dashboard from "../pages/Dashboard";

const AppLayout = () => {
  return(
    <>
      <Navbar />
      <main className={`min-h-screen`}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path='/' exact element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/store' element={<Shop />} />
          <Route path='/auth/login' element={<UserLogin />} />
          <Route path='/animal/:animalId' element={<AnimalDetails />} />
          <Route path='/auth/user-register' element={<UserRegister />} />
          <Route path='/auth/farmer-register' element={<FarmerRegister />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/user-dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
