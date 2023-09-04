import React from 'react';
// import Search from './Search';
import { NavDropDown } from './NavDropDown';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/slices/authSlice';
import { BiPencil } from 'react-icons/bi';

const Navbar = () => {
  const { isAuthenticated, profiledata } = useSelector(selectAuth);
  // console.log('isAuthenticated', isAuthenticated);
  console.log('profiledata', profiledata);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-3">
        <div className="container-xl">
          <div className="fw-medium fs-4 text-decoration-none">
            <Link to="/" className="text-decoration-none text-dark">
              Blogs
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse mx-lg-4" id="navbarText">
            {/* <Search /> */}
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                {/* <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a> */}

                <Link
                  to="/"
                  className="nav-link active text-decoration-none text-dark"
                >
                  Home
                </Link>
              </li>
            </ul>

            {isAuthenticated ? (
              <div className="row mx-lg-4 align-items-center">
                <div className="nav-item col-lg-6">
                  <div className="d-flex">
                    <span>
                      <BiPencil />
                    </span>
                    <Link
                      to="/write-blog"
                      className="text-decoration-none text-secondary-emphasis"
                    >
                      Write
                    </Link>
                  </div>
                </div>
                <div className="nav-item col-lg-6 mr-lg-4">
                  <NavDropDown profiledata={profiledata} />
                </div>
              </div>
            ) : (
              <span>
                <Link
                  to="/login"
                  className="text-decoration-none text-secondary-emphasis"
                >
                  Login
                </Link>
              </span>
              // <span className="nav-item col-sm-10 mr-lg-4">
              //   <Link
              //     to="/login"
              //     className="text-decoration-none text-secondary-emphasis"
              //   >
              //     Login
              //   </Link>
              // </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
