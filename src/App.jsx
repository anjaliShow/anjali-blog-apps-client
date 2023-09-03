import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
// import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { useSelector } from 'react-redux';
import { selectAuth } from './redux/slices/authSlice';

// we use here react lazy because it is loaded only when it needed.
//This can be useful for optimizing the initial bundle size of your application
const DefaultLayout = React.lazy(() => import('./layouts/DefaultLayout'));

function App() {
  // const { isAuthenticated, token } = useSelector(selectAuth);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<DefaultLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
