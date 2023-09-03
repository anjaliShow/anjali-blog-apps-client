import React, { useState } from 'react';
import { loginFormInput } from '../../assets/data';
import { FomInputs } from '../../components/FomInputs';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';

const Login = () => {
  const [loginData, setLoginData] = useState({
    identifier: '',
    password: '',
  });
  const [erros, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const validateErrors = () => {
    const newErrors = {};

    if (!loginData.identifier || !loginData.password) {
      newErrors.identifier = 'Email or Username is required';
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (validateErrors()) {
        await axios
          .post('http://localhost:8000/api/v1/user/login', loginData)
          .then((res) => {
            // dispatch(login(res?.data?.token))

            if (res?.data?.token) {
              localStorage.setItem('token', res.data?.token);
              
              navigate('/');
            }
          })
          .catch((err) => {
            // console.log('err', err);
            toast.error(err.response?.data.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
      }
    } catch (error) {
      toast.error(error.response?.data.message || 'An error occurred', {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log('error', error);
    }
  };
  return (
    <>
      <ToastContainer />

      <div
        className="d-flex justify-content-center align-items-center"
        style={{ width: 'auto', height: '100vh' }}
      >
        <form
          onSubmit={handleSubmit}
          className="auth_form p-5 shadow  mb-5 bg-body-tertiary rounded"
        >
          <div className="fs-3 fw-semibold">Login</div>
          {loginFormInput.map((input, i) => (
            <FomInputs
              key={i}
              {...input}
              onChange={handleChange}
              value={loginData[input?.name]}
              erros={erros}
            />
          ))}
          <div className="d-flex justify-content-center align-items-center">
            <button
              type="submit"
              className="col-12 auth_button text-light border border-0 p-2 rounded-sm rounded-1 my-3"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
