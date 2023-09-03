import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import MyBlogCard from '../components/MyBlogCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyPosts = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get(
      `https://anj-blog-app-server.onrender.com/api/v1/post/get-my-posts`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      }
    );
    // console.log('data', data);
    setBlogData(data?.post);
  };

  const handleDelete = useCallback(async (id) => {
    try {
      await axios
        .delete(
          `https://anj-blog-app-server.onrender.com/api/v1/post/delete/${id}`,
          {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          }
        )
        .then((res) => {
          console.log('res', res);
          toast.success(res.data?.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          getData();
        })
        .catch((err) => {
          console.log('err', err);
          toast.error(err.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } catch (error) {
      console.log('error', error);
      toast.error(error.response?.data.message || 'An error occurred', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="d-flex flex-column justify-content-center align-items-center width_full">
        {blogData.length === 0 ? (
          <div className="d-flex flex-column justify-content-center align-items-center width_full height_full">
            <p>You have no posts</p>
            <img
              className="thumbnail_img img-fluid"
              src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg?w=996&t=st=1693683255~exp=1693683855~hmac=7011e4d631bc16a6e792c720a6138d2d46a45ebb29c4f8dcb73d2a99befb9a4b"
              alt=""
            />
          </div>
        ) : (
          <>
            <div className="col-md-8">
              {blogData.map((item) => (
                <MyBlogCard
                  key={item?._id}
                  data={item}
                  handleDelete={handleDelete}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyPosts;
