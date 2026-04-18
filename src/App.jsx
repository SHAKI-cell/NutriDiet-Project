import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import FoodInfo from './Pages/FoodInfo'
import DietPlan from './Pages/DietPlan'
import Login from './Pages/Login'
import DashBoard from './Pages/DashBord'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/food-info" element={<FoodInfo />} />
        <Route path="/diet-plan" element={<DietPlan />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<DashBoard />} />
      </Routes>
    </>
  )
}

export default App
