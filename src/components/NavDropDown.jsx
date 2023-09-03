import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

export const NavDropDown = ({ profiledata }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/login');
  };
  return (
    <div className="dropdown my-1">
      <div className="" data-bs-toggle="dropdown" aria-expanded="false">
        <img
          src={profiledata?.avatar}
          alt={profiledata?.fullName}
          className="blogcard_avatar rounded-circle curser"
        />
      </div>
      <ul className="dropdown-menu font_family_wotk_sans">
        <li>
          <Link className="dropdown-item" to="/my-posts">
            My Posts
          </Link>
        </li>

        <li>
          <span className="dropdown-item curser" onClick={handleLogout}>
            Log out
          </span>
        </li>
      </ul>
    </div>
  );
};
