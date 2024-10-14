import { useState } from 'react'
import Header from './components/Header/Header';
import './App.css'
import Home from './pages/Home/Home';
import AddHouse from './pages/AddHouse/AddHouse';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'; // Use Routes instead of Switch
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Recovery from './pages/RecoverPassword/Recovery';
import Reset from './pages/RecoverPassword/Reset';
import Profile from './pages/Profile/Profile';
import { useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './helper/protectedRoutes';
import MyProperty from './pages/MyProperty/MyProperty';
import About from './pages/About/About';

function App() {
  
  return (
    <>
      <AuthProvider>
      <Router>
        <Header />
     {/* <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/addhouse" element={<AddHouse />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />
        <Route path='/profile' element={<Profile />} />
  </Routes> */}
      <AppRoutes />
      <Footer />
    </Router>
    </AuthProvider> 
    </>
  )

  
}

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const id = localStorage.getItem('id');
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addhouse" element={<AddHouse /> } />
      <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute> } />
      <Route path="/register" element={<Register />} />
      <Route path="/recovery" element={<Recovery />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/myproperty" element={<ProtectedRoute><MyProperty /></ProtectedRoute>} />
    </Routes>
  );
}

export default App
