import React, { useEffect, useMemo, useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { createdTime } from '../utils/functions';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { selectAuth } from '../redux/slices/authSlice';
import { MdDelete } from 'react-icons/md';

const Offcanvas = ({ data, handleDeleteComment }) => {
  const { id } = useParams();
  const { isAuthenticated, profiledata } = useSelector(selectAuth);
  const navigate = useNavigate();

  // console.log('profiledata', profiledata);

  const [text, setText] = useState('');

  const memoizedCreatedDate = useMemo(() => {
    return data.map((item) => {
      // console.log('item?.createdAt', item);
      return createdTime(item?.crteatedAt);
    });
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isAuthenticated) {
        await axios
          .put(
            `https://anj-blog-app-server.onrender.com/api/v1/post/add-comment/${id}`,
            { text },
            {
              headers: {
                Authorization: localStorage.getItem('token'),
              },
            }
          )
          .then((res) => {
            console.log('res', res);
            toast.success(res.data?.message, {
              position: toast.POSITION.TOP_LEFT,
            });
          })
          .catch((err) => {
            console.log('err', err);
            toast.error(err.response.data.message, {
              position: toast.POSITION.TOP_LEFT,
            });
          });
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log('error', error);
      toast.error(error.response?.data.message || 'An error occurred', {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <span
        className="fs-5 text-body-tertiary curser"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <FaRegComment /> <span className="fs-6"> {data.length}</span>
      </span>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5
            className="offcanvas-title fw-semibold fs-4"
            id="offcanvasExampleLabel"
          >
            Responses ({data.length})
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="">
            <form action="d-flex flex-column shadow-sm" onSubmit={handleSubmit}>
              <div className="">
                <textarea
                  type="text"
                  name="text"
                  placeholder="What are your thoughts?"
                  className="border border-0"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
              </div>
              <div className="d-flex justify-content-start">
                <button
                  type="submit"
                  className="bg-success border border-0 text-light px-4 py-2 rounded-1"
                  disabled={text ? false : true}
                >
                  Respond
                </button>
              </div>
            </form>
          </div>
          <div className="d-flex flex-column my-5">
            {data?.map((item, index) => (
              <div className="my-3" key={item?._id}>
                <div className="d-flex gap-3">
                  <div className="">
                    <img
                      src={item?.postedBy?.avatar}
                      alt=""
                      className="blogcard_avatar rounded-circle"
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <div className="">{item?.postedBy?.fullName}</div>
                    <div className="">{memoizedCreatedDate}</div>
                  </div>
                  {item?.postedBy?._id === profiledata?._id && (
                    <div
                      className="fs-5 text-danger curser"
                      onClick={() =>
                        handleDeleteComment({
                          postId: id,
                          commentId: item?._id,
                        })
                      }
                    >
                      <MdDelete />
                    </div>
                  )}
                </div>
                <div className="my-2">
                  <p>{item?.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Offcanvas;
