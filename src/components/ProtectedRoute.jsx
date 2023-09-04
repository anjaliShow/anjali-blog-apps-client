import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectAuth } from '../redux/slices/authSlice';
import jwt_decode from 'jwt-decode';
import { Navigate, Route, useLocation, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, token } = useSelector(selectAuth);

  // console.log('isAuthenticated', isAuthenticated);
  // console.log('token', token);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated && !token) {
      navigate('/login');
    } else {
      const decoded = jwt_decode(token);
      // console.log('decoded', decoded);

      const currentTime = Date.now() / 100000;
      // console.log('currentTime', currentTime);

      if (decoded.exp < currentTime) {
        // console.log('clikkkeddd');
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/login');
        // return <Navigate to="/login" />;
      } else {
        document.title = `Blogss | ${location.pathname}`;
        // dispatch(login(token));
      }
    }
  }, []);

  return children;
};

export default ProtectedRoute;
