import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from "./pages/login.tsx"
import Profile from "./pages/profile.tsx"
import Registeri from './pages/register.tsx'
import LandingPage from './pages/landing.tsx'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Routes>
        {/* <Route path='/' element = {<Navigate to="/login" />} /> */}
        <Route path = "/" element = {<Navigate to = "/landing" />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/profile" element = {<Profile />} />
        <Route path = "/register" element = {<Registeri />} />
      </Routes>
      <ToastContainer />
      
    </>
  )
}

export default App
