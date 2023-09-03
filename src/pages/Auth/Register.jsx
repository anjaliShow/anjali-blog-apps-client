import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { registerFormInputs } from '../../assets/data';
import { FomInputs } from '../../components/FomInputs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, redirect, useNavigate } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    avatar: '',
    confirmPassword: '',
  });
  const [erros, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.files[0] });
  };

  // console.log('userData', userData);

  const validateErrors = () => {
    const newErrors = {};

    if (!userData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    if (!userData.username) {
      newErrors.username = 'Username is required';
    }

    if (!userData.email) {
      newErrors.email = 'Email is required';
    }
    if (!userData.password) {
      newErrors.password = 'Password is required';
    }
    if (
      !userData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      newErrors.email = 'Please enter valid email address';
    }
    if (
      !userData.password.match(
        /^(?=(?:\D*\d){4})(?=(?:\d*\D){4})[a-zA-Z\d]{8}$/
      )
    ) {
      newErrors.password =
        'Password should be at least 8 characters long with 4 alphabets and 4 numbers';
    }

    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = 'Password does not match';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      if (validateErrors()) {
        const formData = new FormData();
        formData.append('fullName', userData.fullName);
        formData.append('username', userData.username);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('avatar', userData.avatar);

        await axios
          .post('https://anj-blog-app-server.onrender.com/api/v1/user/register', formData)
          .then((res) => {
            // console.log('res', res);
            toast.success(res.data?.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
            setInterval(() => {
              navigate('/login');
            }, 2000);
          })
          .catch((err) => {
            // console.log('err', err);
            toast.error(err.response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <>
      <ToastContainer />

      <div
        className="d-flex justify-content-center align-items-center my-5"
        style={{ width: 'auto', height: '100vh' }}
      >
        <form
          action=""
          className="auth_form p-5 shadow mb-5 bg-body-tertiary rounded mt-5"
          onSubmit={handleRegisterSubmit}
        >
          <div className="fs-3 fw-semibold">Signup</div>
          {registerFormInputs.map((input, index) => (
            <FomInputs
              key={index}
              {...input}
              value={input?.name === 'avatar' ? '' : userData[input?.name]}
              onChange={
                input?.name === 'avatar' ? handleFileChange : handleChange
              }
              erros={erros}
            />
          ))}
          <div className="d-flex justify-content-center align-items-center">
            <button
              type="submit"
              className="col-12 auth_button text-light border border-0 p-2 rounded-sm rounded-1 my-3"
            >
              Signup
            </button>
          </div>
          <p className="text-center">
            Already have an account ?
            <Link
              className="text-primary curser text-decoration-none"
              to={'/login'}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
