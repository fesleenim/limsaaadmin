import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import LoginPage from './pages/login';
import Layout from './components/layout';

function App() {
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate("/login")
    }
  }, [token])
  return token ? <Layout><Outlet /></Layout>:<LoginPage />
}

export default App;
