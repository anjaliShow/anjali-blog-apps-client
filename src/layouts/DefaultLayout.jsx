import React, { useEffect, useState } from 'react';

import AppContent from '../components/AppContent';

import { useDispatch } from 'react-redux';
import { login, logout, profile } from '../redux/slices/authSlice';
import axios from 'axios';
import Navbar from '../components/Navbar';

const DefaultLayout = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  if (token) {
    dispatch(login(token));
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get(
      'http://localhost:8000/api/v1/user/get-profile',
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
    // console.log('data', data);

    dispatch(profile(data?.user));
  };

  return (
    <div>
      <Navbar />
      <AppContent />
    </div>
  );
};

export default DefaultLayout;
