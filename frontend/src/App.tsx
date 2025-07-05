import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login.tsx";
import Profile from "./pages/profile.tsx";
import Registeri from "./pages/register.tsx";
import LandingPage from "./pages/landing.tsx";
import Dashboard from "./pages/dashboard.tsx";
import { ToastContainer } from "react-toastify";
import RequireAuth from "./components/requireAuth";
import EditProfile from "./pages/edit.tsx";


function App() {
  return (
    <>
      <Routes>
        {/* <Route path='/' element = {<Navigate to="/login" />} /> */}
        <Route path="/" element={<Navigate to="/landing" />} />
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Registeri />} />
        <Route path ="/edit" element = {<EditProfile />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
